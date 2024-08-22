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

const Account_Management = () => {
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
                    <CTableHeaderCell scope="col">Profile Information</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Conatct details</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status Adjust</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Itinerary Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>5</CTableDataCell>
                    <CTableDataCell>ghj</CTableDataCell>
                    <CTableDataCell>4</CTableDataCell>
                    <CTableDataCell>Approved</CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>3</CTableDataCell>
                    <CTableDataCell>Ot4/24to</CTableDataCell>
                    <CTableDataCell>Approved</CTableDataCell>
                    <CTableDataCell>
                    <CTableDataCell>cgmnsz
                    </CTableDataCell>
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

export default Account_Management