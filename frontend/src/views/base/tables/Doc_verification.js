// import React, { useState } from 'react';
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableCaption,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CButton,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilTrash, cilPencil } from '@coreui/icons';
// import { DocsExample } from 'src/components';

// const Doc_verification = () => {
//   const [showModal, setShowModal] = useState(false);

//   const handleViewDocument = () => {
//     // Logic to view document goes here
//     // This function will be called when the user clicks "View Document"
//     // For now, let's just open the modal
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     // Logic to close the modal goes here
//     setShowModal(false);
//   };

//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardBody>
//               <CTable caption="top">
//                 <CTableCaption>List of users</CTableCaption>
//                 <CTableHead>
//                   <CTableRow>
//                     <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Place Name</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Guide Name</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Edit/Delete</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">View Document</CTableHeaderCell>
//                   </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                   <CTableRow>
//                     <CTableHeaderCell scope="row">1</CTableHeaderCell>
//                     <CTableDataCell>3/4/24</CTableDataCell>
//                     <CTableDataCell>Otto</CTableDataCell>
//                     <CTableDataCell>mdo</CTableDataCell>
//                     <CTableDataCell>
//                       <CButton color="primary" style={{ marginRight: '8px' }}>
//                         <CIcon icon={cilPencil} />
//                       </CButton>
//                       <CButton color="danger">
//                         <CIcon icon={cilTrash} style={{ color: 'white' }} />
//                       </CButton>
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       <CButton color="info" onClick={handleViewDocument}>
//                         View Document
//                       </CButton>
//                     </CTableDataCell>
//                   </CTableRow>

//                   <CTableRow>
//                     <CTableHeaderCell scope="row">1</CTableHeaderCell>
//                     <CTableDataCell>3/4/24</CTableDataCell>
//                     <CTableDataCell>Otto</CTableDataCell>
//                     <CTableDataCell>mdo</CTableDataCell>
//                     <CTableDataCell>
//                       <CButton color="primary" style={{ marginRight: '8px' }}>
//                         <CIcon icon={cilPencil} />
//                       </CButton>
//                       <CButton color="danger">
//                         <CIcon icon={cilTrash} style={{ color: 'white' }} />
//                       </CButton>
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       <CButton color="info" onClick={handleViewDocument}>
//                         View Document
//                       </CButton>
//                     </CTableDataCell>
//                   </CTableRow>

//                 </CTableBody>
//               </CTable>
//           </CCardBody>
//         </CCard>
//       </CCol>

//       {/* Modal for viewing document */}
//       <CModal show={showModal} onClose={handleCloseModal}>
//         <CModalHeader closeButton>
//           <CModalTitle>View Document</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <p>Document content goes here...</p>
//         </CModalBody>
//         <CModalFooter>
//           <CButton color="secondary" onClick={handleCloseModal}>Close</CButton>
//           {/* Add any other actions/buttons here */}
//         </CModalFooter>
//       </CModal>
//     </CRow>
//   );
// };

// export default Doc_verification;

import React, {useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil } from '@coreui/icons'
import { DocsExample } from 'src/components'

const Doc_verification = () => {
  const [visible, setVisible] = useState(false)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable caption="top">
              <CTableCaption>List of users</CTableCaption>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Place Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Guide Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Edit/Delete</CTableHeaderCell>
                  <CTableHeaderCell scope="col">View Document</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>nvdhbdgv</CTableDataCell>
                  <CTableDataCell>hgdb</CTableDataCell>
                  <CTableDataCell>nbvnbn</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="primary" style={{ marginRight: '8px' }}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton size="sm" color="danger">
                      <CIcon size="lg" icon={cilTrash} style={{ color: 'white' }} />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell> 
                  <CTableDataCell>
                    <CButton color="primary" size="sm" onClick={() => setVisible(!visible)}>
                      View Document
                    </CButton>
                    <CModal
                      visible={visible}
                      onClose={() => setVisible(false)}
                      aria-labelledby="LiveDemoExampleLabel"
                    >
                      <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <p>Document 1</p>
                        <p>Document 2</p>
                        <p>Document 3</p>
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                          Close
                        </CButton>
                        <CButton color="primary">Save changes</CButton>
                      </CModalFooter>
                    </CModal>
                  </CTableDataCell>
                  </CTableDataCell>
                </CTableRow>

                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Excellent</CTableDataCell>
                  <CTableDataCell>6/6/2024</CTableDataCell>
                  <CTableDataCell>vbvnvbb</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="primary" style={{ marginRight: '8px' }}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton size="sm" color="danger">
                      <CIcon size="lg" icon={cilTrash} style={{ color: 'white' }} />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" size="sm" onClick={() => setVisible(!visible)}>
                      View Document
                    </CButton>
                    <CModal
                      visible={visible}
                      onClose={() => setVisible(false)}
                      aria-labelledby="LiveDemoExampleLabel"
                    >
                      <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <p>Document 1</p>
                        <p>Document 2</p>
                        <p>Document 3</p>
                      </CModalBody>
                      <CModalFooter>
                        <CButton size="sm" color="secondary" onClick={() => setVisible(false)}>
                          Close
                        </CButton>
                        <CButton size="sm" color="primary">Save changes</CButton>
                      </CModalFooter>
                    </CModal>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Doc_verification
