import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';

const API_URL = 'http://localhost:5000/api/auth/resetPassword'; // Backend API URL for resetting password

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(API_URL, { newPassword });
      setMessage(response.data.message);
      setError('');
      // Optionally navigate to another page
      navigate('/login');
    } catch (error) {
      setMessage('');
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Failed to reset password');
      }
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="d-flex justify-content-center align-items-center min-vh-100">
        <CRow className="justify-content-center">
          <CCol md={15}>
            <CCardGroup className="shadow-lg">
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 className="text-center">Reset Password</h1>
                    <p className="text-body-secondary text-center">Enter your new password</p>
                    {message && <p className="text-success text-center">{message}</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="New Password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow className="justify-content-center">
                      <CCol xs={12} className="text-center">
                        <CButton color="primary" className="px-4" onClick={handleResetPassword}>
                          Reset Password
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Welcome Back!</h2>
                    <p>
                      If you remember your password, click below to go back to the login page.
                    </p>
                    <CButton color="primary" className="mt-3" onClick={() => navigate('/login')}>
                      Login
                    </CButton>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPassword;
