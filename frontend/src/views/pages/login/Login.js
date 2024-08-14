import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { cilLockLocked, cilUser } from '@coreui/icons';

// Import your image here
import logoImage from './Logo.png'; // Replace with your actual image path
import { color } from 'chart.js/helpers';

const API_URL = 'http://localhost:5007/api/auth/login-admin'; // Backend API URL for outfitter login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, { email, password });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Store token in localStorage
        // Redirect to dashboard or another route upon successful login
        navigate('/dashboard'); // Use navigate hook to redirect
      } else {
        setError(response.data.message || 'Failed to login. Please check your credentials.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Failed to login. Please check your credentials.');
      }
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {/* Insert image in the center */}
                  <div className="mb-4 text-center">
                    <img src={logoImage} alt="Logo" style={{ maxWidth: '30%', height: 'auto' }} />
                  </div>
                  <CForm onSubmit={handleSubmit}>
                    <h1 className='text-center'>Login</h1>
                    <p className="text-body-secondary text-center">Sign In to your account</p>
                    {error && <p className="text-danger">{error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
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
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol className='text-center'>
                        <CCol>
                          <CButton type="submit" color="primary" className="px-4">
                            Login
                          </CButton>
                        </CCol>
                        <CCol className="text-right">
                        
                      </CCol>
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

export default Login;
