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

const Manage_invoices = () => {
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
                  <CTableHeaderCell scope="col">Transaction History</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">View Document</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>nvdhbdgv</CTableDataCell>
                  <CTableDataCell>13/05/2024</CTableDataCell>
                  <CTableDataCell>1200</CTableDataCell>
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
                  <CTableDataCell>1500</CTableDataCell>
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
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Manage_invoices