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

const Animal_Weather = () => {
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
                    <CTableHeaderCell scope="col">Animal Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kills</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Processing Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sighting</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Edit/Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Lion</CTableDataCell>
                    <CTableDataCell>3</CTableDataCell>
                    <CTableDataCell>Pending</CTableDataCell>
                    <CTableDataCell>gfh</CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="primary" style={{ marginRight: '8px' }}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton size="sm" color="danger">
                        <CIcon icon={cilTrash} style={{color: 'white'}}/>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Tiger</CTableDataCell>
                    <CTableDataCell>2</CTableDataCell>
                    <CTableDataCell>Pending</CTableDataCell>
                    <CTableDataCell>vcb</CTableDataCell>
                    <CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="primary" style={{ marginRight: '8px' }}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton size="sm" color="danger">
                        <CIcon icon={cilTrash} style={{color: 'white'}}/>
                      </CButton>
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

export default Animal_Weather