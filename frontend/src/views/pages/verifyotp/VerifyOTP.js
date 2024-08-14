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
import { cilShieldAlt } from '@coreui/icons';

const API_URL = 'http://localhost:5001/api/auth/verifyOTP'; // Backend API URL for verifying OTP

const VerifyOTP = () => {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(API_URL, { otp });
      setMessage(response.data.message);
      setError('');
      // Optionally navigate to another page
      navigate('/forgot-password');
    } catch (error) {
      setMessage('');
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Failed to verify OTP');
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
                    <h1 className="text-center">Verify OTP</h1>
                    <p className="text-body-secondary text-center">Enter the OTP sent to your email</p>
                    {message && <p className="text-success text-center">{message}</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilShieldAlt} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow className="justify-content-center">
                      <CCol xs={12} className="text-center">
                        <CButton color="primary" className="px-4" onClick={handleVerifyOTP}>
                          Verify OTP
                        </CButton>
                      </CCol>
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

export default VerifyOTP;
