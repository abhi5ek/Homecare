import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CForm,
  CFormInput,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';


// Import necessary Font Awesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import ClientManagement from './ClientManagement';
// import { workStatus } from '../../../../../HomecareBackend/controllers/guideController';


// import CIcon from '@coreui/icons-react'
// import { cilTrash, cilPencil } from '@coreui/icons'

const HomecareManagement = () => {
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [status, setStatus] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guideId, setGuideid] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [workstatusdata, setWorkstatusdata] = useState([]);
  const [popup, setPopup] = useState({ visible: false, message: '', title: '' });
  const [guides, setGuides] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    role: '',
    age: '',
    image: null,
    address: ''
  });
  const [error, setError] = useState(null);

  const showPopup = (title, message) => {
    setPopup({ visible: true, message, title });
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get('http://13.200.240.28:5000/api/guide/');
      setGuides(response.data.data);
    } catch (error) {
      setError('Error fetching guides');
      console.error('Error fetching guides:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://13.200.240.28:5000/api/guide/${id}`);
      setGuides(guides.filter(guide => guide._id !== id));
    } catch (error) {
      setError('Error deleting user');
      console.error('Error deleting user:', error);
    }
  };

  const handleAddGuide = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('mobileNumber', formData.mobileNumber);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('address', formData.address);
    if (formData.image) {
        formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://13.200.240.28:5000/api/guide/register', formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
      }
      });
      const newGuide = response.data.data;
      setGuides([...guides, newGuide]);
      setFormVisible(false);
      resetFormData();
    } catch (error) {
      setError('Error adding User');
      console.error('Error adding User:', error);
    }
  };

  const handleEdit = (guide) => {
    setSelectedGuide(guide);
    setFormData({
      name: guide.name || '',
      email: guide.email || '',
      mobileNumber: guide.mobileNumber || '',
      role: guide.role || '',
      age: guide.age || '',
      address: guide.address || '',
      password: '', // Password field will not be pre-filled for security reasons
    });
    setEditVisible(true);
  };

  const handleEditGuide = async (event) => {
    event.preventDefault();
    const { _id } = selectedGuide;
    try {
      await axios.put(`http://13.200.240.28:5000/api/guide/editguide/${_id}`, formData);
      setEditVisible(false);
      resetFormData();
      await fetchGuides(); // Fetch the latest data after updating
    } catch (error) {
      setError('Error updating guide');
      console.error('Error updating guide:', error);
    }
  };

  const  handleworkstatus = async (id) => {
    try{
      const response = await axios.get(`http://13.200.240.28:5000/api/guide/getguide/${id}`);
      const workStatus = response.data.data.workStatus;
      console.log('workstatus',workStatus);
      setGuideid(id);
      setWorkstatusdata(workStatus);
      console.log(response);
      setStatus(true);
    }catch(error){
      setError('Error workstatus');
      console.error('Error updating workstatus:', error);
    }
  }

  const deleteworkstatus = async (guideId, workStatusid, clientid) => {
    try{
      const confirmation = window.confirm('Work Assignment will be deleted')
      if(confirmation){
        // update the workStatus
        const response = await axios.get(`http://13.200.240.28:5000/api/guide/getguide/${guideId}`);
        const updatedguidedata = response.data.data.workStatus.filter( clientId => clientId._id!==workStatusid);
        setStatus(false);
       
        // update the modelclientid
        const updatedmodelclientid = response.data.data.modelclientid.filter(modelclientid => modelclientid!=clientid );
        await axios.put(`http://13.200.240.28:5000/api/guide/updateworker/${guideId}`, {modelclientid:updatedmodelclientid});
      
        //removes workerid from clientdata
        await axios.put(`http://13.200.240.28:5000/api/client/editClient/${clientid}`,{workerid:'', assignStatus:'NOT ASSIGNED', assigned:'ASSIGN'});
        await axios.put(`http://13.200.240.28:5000/api/guide/deleteworkstatus/${guideId}`,{workStatus:updatedguidedata});
      }

    }catch(error){
      setError('Error workstatus');
      console.error('Error updating workstatus:', error);
    }
  }

  const handleChange = (e) => {
    const { id, value, files } = e.target;
        if (id === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [id]: value });
        }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
      role: '',
      age: '',
      image: null,
      address: ''
    });
  };


  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard>
        <CCardHeader>
          <CRow className="align-items-center">
            <CCol>
              <div style={{ fontSize: '1rem' }}>
                Homecare Management
              </div>
            </CCol>
            <CCol xs="auto" className="px-4">
              <CButton color="primary" className="px-4" onClick={() => setFormVisible(true)}>Add Worker</CButton>
            </CCol>
          </CRow>
        </CCardHeader>

        <CTable hover bordered striped responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col" >#</CTableHeaderCell>
              <CTableHeaderCell scope="col" >Photo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Age</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Work Status</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Client ID</CTableHeaderCell> */}
              <CTableHeaderCell scope="col">Role</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">Actions</CTableHeaderCell>
            </CTableRow>

          </CTableHead>
          <CTableBody>
            {guides.map((guide, index) => (
              <CTableRow key={guide._id}>
                <CTableHeaderCell scope="row" >{index + 1}</CTableHeaderCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  {guide.image && <img src={`http://13.200.240.28:5000${guide.image}`} alt={guide.name} style={{ width: '100px' }} />}
                </CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{guide.name || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{guide.age || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{guide.email || 'null'}</CTableDataCell>
                <CTableDataCell  style={{ fontSize: '0.870rem' }}>{guide.mobileNumber || 'null'}</CTableDataCell>
                <CTableDataCell  style={{ fontSize: '0.870rem' }}>{guide.address || 'null'}</CTableDataCell>
                <CTableDataCell  style={{ fontSize: '0.870rem' }}>
                <CButton style={{width:'70px'}} color='info' onClick={() => handleworkstatus(guide._id)} size='sm' className="p-2">view</CButton>
                </CTableDataCell>
                {/* <CTableDataCell  style={{ fontSize: '0.870rem' }}>
                  { guide.modelclientid.map((clients) =>(
                  <CTableRow>
                    <CTableDataCell>
                   {clients}
                    </CTableDataCell>
                  </CTableRow>
                  ))}
                </CTableDataCell> */}
                <CTableDataCell  style={{ fontSize: '0.870rem' }}>{guide.role || 'null'}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton className="me-1 p-1" onClick={() => handleEdit(guide)}> <FontAwesomeIcon icon={faEdit} style={{ color: "#903dbd" }} /></CButton>
                  <CButton className="me-1 p-1" onClick={() => handleDelete(guide._id)}><FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#a82424" }}
                    /></CButton>
                  <CButton className="p-1" onClick={() => { setSelectedGuide(guide); setVisible(true); }}><FontAwesomeIcon icon={faEye} style={{ color: "#93ab1c" }}/></CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>

        </CTable>
      </CCard>

      <CModal visible={formVisible} onClose={() => { setFormVisible(false); resetFormData(); }}>
        <CModalHeader closeButton>
          <CModalTitle>Add Worker</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleAddGuide}>
            <CCol md={6}>
              <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="age" label="Age" value={formData.age} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="email" label="Email" value={formData.email} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="address" id="address" label="address" value={formData.address} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="role" label="Role" value={formData.role} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
              <CFormInput type="file" id="image" label="Image" onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">Submit</CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setFormVisible(false); resetFormData(); }}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={editVisible} onClose={() => { setEditVisible(false); resetFormData(); }}>
        <CModalHeader closeButton>
          <CModalTitle>Edit Guide</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleEditGuide}>
            <CCol md={6}>
              <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="email" label="Email" value={formData.email} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="age" label="Age" value={formData.age} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="address" label="Address" value={formData.address} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">Submit</CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setEditVisible(false); resetFormData(); }}>Close</CButton>
        </CModalFooter>
      </CModal>

      
      <CModal size='lg' visible={status} onClose={() => { setStatus(false)}}>
        <CModalHeader closeButton>
          <CModalTitle>WORK STATUS</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CTable hover bordered striped responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col" >#</CTableHeaderCell>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">STATUS</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">ACTIONS</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {workstatusdata.map((workStatus, index) => (
              <CTableRow key={workStatus._id}>
                <CTableHeaderCell scope="row" >{index + 1}</CTableHeaderCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{workStatus.clientId || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{workStatus.clientName || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  <CButton color={workStatus.status === 'PENDING'? 'warning':'success'} style={{ width: '100px',height: '50px',padding: '4px 8px', 
                  fontSize: '0.95rem'}}>{workStatus.status}</CButton>
                </CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  <CButton color='danger'  onClick={() => deleteworkstatus(guideId,workStatus._id,workStatus.clientId)}  style={{ width: '100px',height: '50px',padding: '4px 8px', 
                  fontSize: '0.95rem'}}>DELETE</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setStatus(false); }}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>User Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedGuide && (
            <CListGroup flush>
              <CListGroupItem><strong>Name:</strong> {selectedGuide.name || 'null'}</CListGroupItem>
              <CListGroupItem><strong>Age:</strong> {selectedGuide.age || 'null'}</CListGroupItem>
              <CListGroupItem><strong>Email:</strong> {selectedGuide.email || 'null'}</CListGroupItem>
              <CListGroupItem><strong>Address:</strong> {selectedGuide.address || 'null'}</CListGroupItem>
              <CListGroupItem><strong>Mobile Number:</strong> {selectedGuide.mobileNumber || 'null'}</CListGroupItem>
              <CListGroupItem><strong>password</strong> {selectedGuide.password || 'null'}</CListGroupItem>
              <CListGroupItem><strong>Role</strong> {selectedGuide.role || 'null'}</CListGroupItem>
            </CListGroup>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
      {/* <div>
        <ClientManagement
          guideprop = {{ name:guides.name, email:guides.email, mobileNumber:guides.mobileNumber, role:guides.role}}
        />
      </div> */}
    </>
  );
};

export default HomecareManagement;
