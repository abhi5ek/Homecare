import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil } from '@coreui/icons'
import { DocsExample } from 'src/components'

const Booking_Management = () => {
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
                    <CTableHeaderCell scope="col">Hunting Experience</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User Information</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Accept, Reject or Modify Bookings</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Good</CTableDataCell>
                    <CTableDataCell>3/4/2024</CTableDataCell>
                    <CTableDataCell>nbvnbn</CTableDataCell>
                    <CTableDataCell>approved</CTableDataCell>
                    <CTableDataCell>Accept, Reject and Modify</CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Excellent</CTableDataCell>
                    <CTableDataCell>6/6/2024</CTableDataCell>
                    <CTableDataCell>Pending</CTableDataCell>
                    <CTableDataCell>Accept</CTableDataCell>
                    <CTableDataCell>Accept, Reject and Modify</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Booking_Management