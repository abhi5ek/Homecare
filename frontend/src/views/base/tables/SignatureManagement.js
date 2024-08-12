import { CButton, CCard, CCardHeader, CCol, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const SignatureManagement = () => {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const [signature, setSignature] = useState(null);
    // const [formVisible, setFormVisible] = useState(false);
    useEffect(() => {
        fetchClients();
        console.log("true");
      }, []);

      const addSignature = async () => {
        setSignature(true)
      }
    
      const fetchClients = async () => {
        try {
          const response = await axios.get('http://13.200.240.28:5000/api/client/');
          setClients(response.data.data);
        } catch (error) {
          setError('Error fetching clients');
          console.error('Error fetching clients:', error);
        }
      };
  return (
    <>

        <CModal size='sm' visible={signature} onClose={() => { setSignature(false);}}>
        <CModalHeader closeButton>
          <CModalTitle>Add Signature</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CTable hover bordered striped responsive>
        <CFormInput type="file" id="formFile" label="" />
        <CButton  color="info" onClick={() => {addSignature()}} style={{ marginTop: '12px', width: '80px',height: '30px',padding: '4px 8px', 
                  fontSize: '0.95rem'}}>Add</CButton>
        </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => { setSignature(false); }}>Close</CButton>
        </CModalFooter>
      </CModal>

   {/* {error && <CAlert color="danger">{error}</CAlert>} */}
      {/* <CCard> */}
        {/* <CCardHeader>
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
        </CCardHeader> */}

        <CTable hover bordered striped responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">Age</CTableHeaderCell>
              <CTableHeaderCell scope="col">Medical History</CTableHeaderCell>
              <CTableHeaderCell scope="col">Signature</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Assign</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell> */}
              {/* <CTableHeaderCell scope="col" className="text-center">Actions</CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {clients.map((client, index) => (
              <CTableRow key={client._id}>
                <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.name || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.email || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.mobileNumber || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.age || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.medicalhistory || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.signature || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                    <CButton color="info" onClick={() => {addSignature(client._id)}} style={{ width: '120px',height: '40px',padding: '4px 8px', 
                  fontSize: '0.95rem'}}>Add Signature</CButton>
                </CTableDataCell>
                {/* <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  <CButton  color="info" onClick={() => {clientAssigned(client._id,client.assigned,client.assignStatus)}} style={{ width: '80px',height: '30px',padding: '4px 8px', 
                  fontSize: '0.95rem'}}>{client.assigned || 'null'}</CButton>
                </CTableDataCell> */}
                {/* <CTableDataCell style={{ fontSize: '0.870rem' }}>{client.assignStatus || 'null'}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton className="me-1 p-1" onClick={() => handleEdit(client)}>
                    <FontAwesomeIcon icon={faEdit} style={{ color: "#c24c9d" }} />
                  </CButton>
                  <CButton className="me-1 p-1" onClick={() => handleDelete(client._id)}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#a82424" }} />
                  </CButton>
                  <CButton className="p-1" onClick={() => { setSelectedclient(client); setVisible(true); }}>
                    <FontAwesomeIcon icon={faEye} style={{ color: "#20c5aa" }} />
                  </CButton>
                </CTableDataCell> */}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      {/* </CCard> */}

    </>
  )
}

export default SignatureManagement
