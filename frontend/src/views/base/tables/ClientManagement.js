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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
// import { workStatus } from '../../../../../HomecareBackend/controllers/guideController';
// import { assign } from 'core-js/core/object';

const ClientManagement = () => {
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [action, setAction] = useState(false);
  const [selectedclient, setSelectedclient] = useState(null);
  const [clients, setClients] = useState([]);
  // const [clientsAssigned, setClientAssigned] = useState([]);
  const [workers, setWorkers] = useState([]);
  // const [assignWorkers, setassignWorkers] = useState([]);
  const [view, setView] = useState(false);
  const [dataVisible, setDataVisible] = useState(false);
  const [clientid, setClientid] = useState("");
  const [worker, setWorker] = useState("");
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
    age: '',
    medicalhistory: '',
    password: '',
    role: '',
    assigned: 'ASSIGN',
    assignStatus: 'NOT ASSIGNED',
    image: null
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);



  const fetchClients = async () => {
    try {
      const response = await axios.get('http://13.200.240.28:5007/api/client/');
      setClients(response.data.data || []);
    } catch (error) {
      setError('Error fetching clients');
      console.error('Error fetching clients:', error);
    }
  };



  const handleAssign = async (id) => {
    try {
      const response = await axios.get('http://13.200.240.28:5007/api/guide/');
      setWorkers(response.data.data);
      setView(true);

    } catch (error) {
      setError('Error fetching clients');
      console.error('Error fetching clients:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://13.200.240.28:5007/api/client/deleteClient/${id}`);
      setClients(clients.filter(client => client._id !== id));
    } catch (error) {
      setError('Error deleting user');
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClient = async (event) => {
    event.preventDefault();
    const confirmEdit = window.confirm('Are you sure you want to update this client?');
    if (confirmEdit) {
      const { _id } = selectedclient;
      try {
        await axios.put(`http://13.200.240.28:5007/api/client/editClient/${_id}`, formData);
        setEditVisible(false);
        resetFormData();
        await fetchClients();
        alert('Client updated successfully');
      } catch (error) {
        alert('Error updating client');
        console.error('Error updating client:', error);
      }
    } else {
      alert('Update action canceled');
    }
  };


  const handleAddClient = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('mobileNumber', formData.mobileNumber);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('age', formData.age);
    data.append('role', formData.role);
    data.append('medicalhistory', formData.medicalhistory);
    data.append('password', formData.password);
    data.append('assigned', formData.assigned);
    data.append('assignStatus', formData.assignStatus);
    data.append('workerid', formData.workerid);
    data.append('image', formData.image);

    console.log('data', data);


    try {
      console.log("hhhh", formData);
      // const response = await axios.post('http://13.200.240.28:5007/api/client/addClient', formData);
      const response = await axios.post('http://13.200.240.28:5007/api/client/addClient', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Client added:', response); // Log the response
      // const newClient = response.data.data;
      // setClients([...clients, newClient]);
      fetchClients();
      setFormVisible(false);
      resetFormData();
    } catch (error) {
      setError('Error adding User');
      console.error('Error adding User:', error);
    }
  };


  const updateStatus = async (guideId, workstatusdataid) => {
    try {

      const status = 'COMPLETED';
      const payload = { status };

      console.log(payload);
      const response = await axios.put(`http://13.200.240.28:5007/api/guide/updatestatus/${guideId}/${workstatusdataid}`, payload);

      if (response.status === 200) {
        console.log('Work status updated successfully', response.data);
      } else {
        console.log('Failed to update work status', response.data);
      }
    } catch (error) {
      console.error('Error updating work status:', error);
    }
  };

  // const clientNotAssigned = async (id,assigned,assignStatus) => {
  //   try{
  //     handleAssign();
  //     setClientid(id);
  //     var assignS = assigned === 'true'? 'NOT ASSIGNED' : 'ASSIGNED';
  //     var assign = assigned === 'true'? false : true ;
  //     console.log(id,assignStatus,assigned)
  //     await axios.put(`http://13.200.240.28:5007/api/client/editClient/${id}`,{assigned:assign,assignStatus:assignS});  
  //     resetFormData();
  //     await fetchClients();
  //   }catch(error){
  //     setError('Error Assigning');
  //     console.error('Error Assigning:', error);
  //   }
  // }
  // const clientIsAssigned = async (id,assigned,assignStatus) => {
  //   try{
  //     var assignS = assigned === 'true'? 'NOT ASSIGNED' : 'ASSIGNED' ;
  //     var assign = assigned === 'true'? false : true ;

  //     console.log(id,assignStatus,assigned);

  //     const response = await axios.get(`http://13.200.240.28:5007/api/client/getworkerid/${id}`);  // getting workers id from client
  //     const getworkerid = response.data.data.workerid;
  //     console.log('getworkerid',getworkerid);

  //     const guidedata = await axios.get(`http://13.200.240.28:5007/api/guide/getguide/${getworkerid}`);
  //     const workstatusdataid = guidedata.data.data.workStatus;
  //     const specificWorkStatus = workstatusdataid.find(status => status.clientId === id && status.status === 'PENDING'); // Replace 'someClientId' with your criteria
  //     const workStatusId = specificWorkStatus._id; 
  //     console.log('workstatusid',workStatusId)
  //     updateStatus(getworkerid,workStatusId);  // updates workstatus from pending to completed



  //     const clientiddata = await axios.get(`http://13.200.240.28:5007/api/guide/getguide/${getworkerid}`);
  //     const updatemodelclientid=clientiddata.data.data.modelclientid;
  //     console.log(updatemodelclientid);
  //     const updatedmodelclientid = updatemodelclientid.filter(modelclient => modelclient!==id);
  //     console.log('ggf',updatedmodelclientid);
  //     await axios.put(`http://13.200.240.28:5007/api/guide/updateworker/${getworkerid}`, {modelclientid:updatedmodelclientid});



  //     await axios.put(`http://13.200.240.28:5007/api/client/editClient/${id}`,{assigned: assign,assignStatus:assignS,workerid:''});
  //     resetFormData();
  //     await fetchClients();
  //   }catch(error){
  //     setError('Error Assigning');
  //     console.error('Error Assigning:', error);
  //   }
  // }

  const clientAssigned = async (id, assigned, assignStatus) => {
    try {
      // if (assigned === 'REASSIGN')
      //   await axios.put(`http://13.200.240.28:5007/api/client/reassign/${id}`)
      setClientid(id);
      setStatus(assigned);
      handleAssign();
      // assigned === 'true' ? clientIsAssigned(id, assigned, assignStatus) : clientNotAssigned(id, assigned, assignStatus);
    } catch (error) {
      alert('Error assigning client');
      console.error('Error assigning client:', error);
    }
  };

  const viewAssignedGuide = async (id) => {
    try {
      const response = await axios.get(`http://13.200.240.28:5007/api/client/getbyid/${id}`)
      setClientid(id);
      const guideid = response.data.data.workerid;
      // console.log('guideid',guideid);
      const guidedata = await axios.get(`http://13.200.240.28:5007/api/guide/getguide/${guideid}`)
      setWorker(guidedata.data.data);
      console.log('worker',worker)
      setDataVisible(true);
    } catch (error) {
      console.log('Error fetching worker data', error);
    }
  };


  const removeworker = async (id) => {
    try{
      const response = await axios.put(`http://13.200.240.28:5007/api/client/reassign/${id}`)
      console.log("Deleted", response.data.data);
      fetchClients();
    }catch(error){
      console.log("Deletaion Failed", error);
    }
  }


  // const assignclientid = async (id) => {
  //   try{
  //     await axios.put(`http://13.200.240.28:5007/api/guide/${id}`,{modelclientid:clientid});
  //     resetFormData();
  //     await fetchClients();
  //   }catch(error){
  //     setError('Error assignclientid');
  //     console.error('Error assignclientid:', error);
  //   }
  // }

  const assignWorker = async (id, clientid, assigned) => {

    if (assigned === 'REASSIGN')
      await axios.put(`http://13.200.240.28:5007/api/client/reassign/${clientid}`)

    const response = await axios.get(`http://13.200.240.28:5007/api/client/getbyid/${clientid}`)
    const clientName = response.data.data.name;

    const clientId = clientid;
    const status = 'PENDING';

    const payload = {
      clientName, clientId, status
    }

    await axios.put(`http://13.200.240.28:5007/api/guide/updateworkstatus/${id}`, { workStatus: payload })

    const workerid = id;
    await axios.put(`http://13.200.240.28:5007/api/client/editClient/${clientid}`, { workerid: workerid, assignStatus: 'ASSIGNED', assigned: 'REASSIGN' });

    await axios.put(`http://13.200.240.28:5007/api/guide/${id}`, { modelclientid: clientid });
    handleAssign();
    resetFormData();
    await fetchClients();
    setView(false);

  };

  // const handleAssign = 

  const handleEdit = (client) => {
    setSelectedclient(client);
    setFormData({
      name: client.name || '',
      email: client.email || '',
      mobileNumber: client.mobileNumber || '',
      role: client.role || '',
      password: '', // Password field will not be pre-filled for security reasons
    });
    setEditVisible(true);
  };

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
      address: '',
      age: '',
      medicalhistory: '',
      password: '',
      role: '',
      assigned: 'ASSIGN',
      assignStatus: 'NOT ASSIGNED',
      image: null
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
                Client Management
              </div>
            </CCol>
            <CCol xs="auto" className="px-4">
              <CButton color="primary" className="px-4" onClick={() => setFormVisible(true)}>Add clients</CButton>
            </CCol>

          </CRow>
        </CCardHeader>

        <CTable hover bordered striped responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Image</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Age</CTableHeaderCell>
              <CTableHeaderCell scope="col">Medical History</CTableHeaderCell>
              <CTableHeaderCell scope="col">Assign</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {clients.map((client, index) => (
              <CTableRow key={client._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  {client.image && <img src={`http://13.200.240.28:5007${client.image}`} alt={client.name} style={{ width: '100px' }} />}
                </CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.name || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.email || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.mobileNumber || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.address || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.age || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.medicalhistory || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  <CButton color={client.assignStatus === 'ASSIGNED' ? 'success' : 'info'}
                    onClick={() => { clientAssigned(client._id, client.assigned, client.assignStatus) }}>
                    {client.assigned || 'null'}
                  </CButton>
                </CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  {client.assignStatus == 'ASSIGNED' ? (
                    <CButton onClick={() => viewAssignedGuide(client._id)} color="primary">
                      View
                    </CButton>
                  ) : (
                    client.assignStatus
                  )}
                </CTableDataCell>
                <CTableDataCell style={{ width: '10%' }} className="text-center">
                  <CButton className="me-1 p-1" onClick={() => handleEdit(client)}>
                    <FontAwesomeIcon icon={faEdit} style={{ color: "#c24c9d" }} />
                  </CButton>
                  <CButton className="me-1 p-1" onClick={() => handleDelete(client._id)}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#a82424" }} />
                  </CButton>
                  <CButton className="p-1" onClick={() => { setSelectedclient(client); setVisible(true); }}>
                    <FontAwesomeIcon icon={faEye} style={{ color: "#20c5aa" }} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>

      <CModal visible={formVisible} onClose={() => { setFormVisible(false); resetFormData(); }}>
        <CModalHeader closeButton>
          <CModalTitle>Add Client</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleAddClient}>
            <CCol md={6}>
              <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="email" label="Email" value={formData.email} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="address" label="Address" value={formData.address} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="age" label="Age" value={formData.age} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="medicalhistory" label="Medical History" value={formData.medicalhistory} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="role" label="Role" value={formData.role} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="file" name='image' id="image" label="Image" onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">Add client</CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setFormVisible(false); resetFormData(); }}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal size='xl' visible={view} onClose={() => { setView(false); }}>
        <CModalHeader closeButton>
          <CModalTitle>Assign Worker</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable hover bordered striped responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col" >#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">Actions</CTableHeaderCell>
              </CTableRow>

            </CTableHead>
            <CTableBody>
              {workers.map((workers, index) => (
                <CTableRow key={workers._id}>
                  <CTableHeaderCell scope="row" >{index + 1}</CTableHeaderCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{workers.name || 'null'}</CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{workers.email || 'null'}</CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{workers.mobileNumber || 'null'}</CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{workers.role || 'null'}</CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>
                    <CButton color="success" onClick={() => { assignWorker(workers._id, clientid, status ) }} style={{
                      width: '100px', height: '50px', padding: '4px 8px',
                      fontSize: '0.95rem'
                    }}>ASSIGN</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>

          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setView(false); }}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={editVisible} onClose={() => { setEditVisible(false); resetFormData(); }}>
        <CModalHeader closeButton>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleEditClient}>
            <CCol md={6}>
              <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="email" label="Email" value={formData.email} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="address" label="Address" value={formData.address} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="age" label="Age" value={formData.age} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="medicalhistory" label="Medical History" value={formData.medicalhistory} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="role" label="Role" value={formData.role} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">Update client</CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setEditVisible(false); resetFormData(); }}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={dataVisible} onClose={() => { setDataVisible(false); }}>
        <CModalHeader closeButton>
          <CModalTitle>Assigned Worker</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup flush>
            <CListGroupItem>
              Image:{worker.image && <img src={`http://13.200.240.28:5007${worker.image}`} alt={worker.name} style={{ width: '100px' }} />}
            </CListGroupItem>
            <CListGroupItem>Name: {worker.name || 'null'}</CListGroupItem>
            <CListGroupItem>Age: {worker.age || 'null'}</CListGroupItem>
            <CListGroupItem>Email: {worker.email || 'null'}</CListGroupItem>
            <CListGroupItem>Mobile Number: {worker.mobileNumber || 'null'}</CListGroupItem>
            <CListGroupItem>Address: {worker.address || 'null'}</CListGroupItem>
            <CListGroupItem>
              <CButton onClick={() => {removeworker(clientid), setDataVisible(false)}} color="danger">Remove Worker</CButton>
            </CListGroupItem>
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setDataVisible(false) }}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>client Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedclient && (
            <CListGroup flush>
              <CListGroupItem>Name: {selectedclient.image || 'null'}</CListGroupItem>
              <CListGroupItem>Name: {selectedclient.name || 'null'}</CListGroupItem>
              <CListGroupItem>Email: {selectedclient.email || 'null'}</CListGroupItem>
              <CListGroupItem>Mobile Number: {selectedclient.mobileNumber || 'null'}</CListGroupItem>
              <CListGroupItem>Address: {selectedclient.address || 'null'}</CListGroupItem>
              <CListGroupItem>Age: {selectedclient.age || 'null'}</CListGroupItem>
              <CListGroupItem>Medical History: {selectedclient.medicalhistory || 'null'}</CListGroupItem>
            </CListGroup>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ClientManagement;
