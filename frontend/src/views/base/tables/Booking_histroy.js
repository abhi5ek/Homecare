import React from 'react';
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilPencil } from '@coreui/icons';
import { DocsExample } from 'src/components';

const Booking_history = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow className="justify-content-between">
              <CCol xs={6}>
                <h5 className="mb-0">Booking History</h5>
              </CCol>
              <CCol xs={6} className="text-end">
                <CDropdown>
                  <CDropdownToggle color="secondary">Export</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Pdf</CDropdownItem>
                    <CDropdownItem href="#">Excel</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable caption="top">
              <CTableCaption>List of users</CTableCaption>
              <CTableHead>
                <CTableRow>
                <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Invoice No</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                <CTableDataCell>1</CTableDataCell>
                  <CTableDataCell>13/05/2024</CTableDataCell>
                  <CTableDataCell>567</CTableDataCell>
                  <CTableDataCell>6356</CTableDataCell>
                </CTableRow>
                <CTableRow>
                <CTableDataCell>2</CTableDataCell>
                  <CTableDataCell>13/05/2024</CTableDataCell>
                  <CTableDataCell>8743</CTableDataCell>
                  <CTableDataCell>3637</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Booking_history;
