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
import { cilEnvelopeClosed } from '@coreui/icons';

const API_URL = 'http://localhost:5000/api/auth/send-email'; // Backend API URL for sending reset password email

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(API_URL, { email });
      setMessage(response.data.message);
      setError('');
      // Optionally navigate to another page
      navigate('/verify-otp');
    } catch (error) {
      setMessage('');
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Failed to send password reset email');
      }
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="d-flex justify-content-center align-items-center min-vh-100">
        <CRow className="justify-content-center">
          <CCol md={20}>
            <CCardGroup className="shadow-lg">
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 className="text-center">Forgot Password</h1>
                    <p className="text-body-secondary text-center">Enter your email to reset your password</p>
                    {message && <p className="text-success text-center">{message}</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow className="justify-content-center">
                      <CCol xs={12} className="text-center">
                        <CButton color="primary" className="px-4" onClick={handleForgotPassword}>
                          Reset Password
                        </CButton>
                      </CCol>
                      {/* <CCol xs={12} className="text-center mt-2">
                        <CButton color="link" className="px-0" onClick={() => navigate('/login')}>
                          Back to Login
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

    </div>
  );
};

export default ForgotPassword;
