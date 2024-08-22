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
import { faCheckCircle, faClock, faEye } from '@fortawesome/free-solid-svg-icons';

const AssessmentManagement = () => {
  const [guides, setGuides] = useState([]);
  const [view, setView] = useState(false);
  const [workstatus, setWorkstatus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGuides();
  }, []);

  // useEffect(() => {
  //   console.log('Updated guides:', guides);
  // }, [guides]);


  const fetchGuides = async () => {
    try {
      const response = await axios.get('http://13.200.240.28:5007/api/guide/');
      setGuides(response.data.data);
      console.log("response", response.data.data);
    } catch (error) {
      setError('Error fetching guides');
      console.error('Error fetching guides:', error);
    }
  };

  const viewClient = async (id) => {
    try {
      const response = await axios.get(`http://13.200.240.28:5007/api/guide/getguide/${id}`);
      setWorkstatus(response.data.data.workStatus);
      console.log(response.data.data.workStatus)
      console.log(workstatus);
      setView(true);
    } catch (error) {
      setError('Error fetching workstatus');
      console.error('Error fetching workstatus:', error);
    }
  }

  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard>
        <CCardHeader>
          <CRow className="align-items-center">
            <CCol>
              <div style={{ fontSize: '1rem' }}>
                Worker's History
              </div>
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
              <CTableHeaderCell scope="col" className="text-center">Actions</CTableHeaderCell>
            </CTableRow>

          </CTableHead>
          <CTableBody>
            {guides
              .map((guide, index) => (
                <CTableRow key={guide._id}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>
                    {guide.image && <img src={`http://13.200.240.28:5007${guide.image}`} alt={guide.name} style={{ width: '100px' }} />}
                  </CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{guide.name || 'null'}</CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{guide.age || 'null'}</CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{guide.email || 'null'}</CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{guide.mobileNumber || 'null'}</CTableDataCell>
                  <CTableDataCell style={{ fontSize: '0.870rem' }}>{guide.address || 'null'}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton className="p-4" style={{ border: "none" }} onClick={() => viewClient(guide._id)} >
                      <FontAwesomeIcon icon={faEye} style={{ color: "green" }} size='2x' />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>

        </CTable>
      </CCard>

      <CModal size='lg' visible={view} onClose={() => { setView(false) }}>
        <CModalHeader closeButton>
          <CModalTitle>ASSIGN CLIENT</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client Id</th>
                <th scope="col">Client Name</th>
                <th scope="col">Task Status</th>
              </tr>
            </thead>
            <tbody>
              {workstatus.map((work, index) => (
                <tr key={work._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{work.clientId}</td>
                  <td>{work.clientName}</td>
                  <td style={{paddingLeft:'45px'}}>
                    {work.status === 'PENDING' ? (
                      <FontAwesomeIcon icon={faClock} style={{ color: 'orange' }} title="Pending" size='2x' />
                    ) : (
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} title="Completed" size='2x' />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setView(false); }}>Close</CButton>
        </CModalFooter>
      </CModal>

    </>
  )
}

export default AssessmentManagement;
