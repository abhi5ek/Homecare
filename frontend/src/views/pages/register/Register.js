import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilMap, cilAnimal, cilAt, cilPhone, cilLockLocked, cilImage } from '@coreui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import logoImage from './Hunt.png'; // Replace with your actual image path

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [animalData, setAnimalData] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [species, setSpecies] = useState([]);
  const [outfitterName, setOutfitterName] = useState('');
  const [selectedSpecie, setSelectedSpecie] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    image: null,  // To store uploaded image file
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(`${API_URL}/animals/getAnimal`);
        setAnimalData(response.data.data);
      } catch (error) {
        console.error('Error fetching animal data:', error);
      }
    };
    fetchAnimals();
  }, []);

  useEffect(() => {
    const fetchSpecies = async () => {
      if (selectedAnimal) {
        try {
          const response = await axios.get(`${API_URL}/animals/getSpecie/${selectedAnimal}`);
          setSpecies(response.data.data);
        } catch (error) {
          console.error('Error fetching species:', error);
        }
      } else {
        setSpecies([]);
      }
    };
    fetchSpecies();
  }, [selectedAnimal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(formData.image);

      // Create outfitter with image URL
      const response = await axios.post(`${API_URL}/outfitter/create`, {
        email,
        password,
        confirmPassword,
        name: username,
        street,
        city,
        outfitterName,
        addressState,
        zipCode,
        mobileNumber,
        animalId: selectedAnimal,
        specieId: selectedSpecie,
        image: imageUrl  // Pass uploaded image URL to backend
      });

      if (response.status === 201) {
        navigate('/login'); // Redirect to login after successful registration
      } else {
        setError(response.data.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Failed to register. Please try again.');
      }
      console.error('Registration Error:', error);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    const CLOUDINARY_UPLOAD_PRESET = 'blog_app';    // Replace with your Cloudinary upload preset name
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', 'dm1piteis');    // Replace with your Cloudinary cloud name
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dqhh1rff5/image/upload`, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Error uploading image to Cloudinary');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  {/* Insert image in the center */}
                  <div className="mb-4 text-center">
                    <img src={logoImage} alt="Logo" style={{ maxWidth: '30%', height: 'auto' }} />
                  </div>
                  <h1 className='text-center'>Register</h1>
                  <p className="text-body-secondary text-center">Create your account</p>
                  {error && <p className="text-danger text-center">{error}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete="name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilMap} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Outfitter Name"
                      autoComplete="outfitter-name"
                      onChange={(e) => setOutfitterName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAt} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Mobile Number"
                      autoComplete="mobile-number"
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon icon={cilMap} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Street"
                          autoComplete="street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon icon={cilMap} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="City"
                          autoComplete="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon icon={cilMap} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="State"
                          autoComplete="address-state"
                          value={addressState}
                          onChange={(e) => setAddressState(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilMap} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Zip Code"
                          autoComplete="zip-code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAnimal} />
                    </CInputGroupText>
                    <CFormSelect
                      value={selectedAnimal}
                      onChange={(e) => {
                        setSelectedAnimal(e.target.value);
                        setSelectedSpecie(''); // Reset selected specie when animal changes
                      }}
                      required
                    >
                      <option value="">Select Animal</option>
                      {animalData.map(animal => (
                        <option key={animal._id} value={animal._id}>
                          {animal.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAnimal} />
                    </CInputGroupText>
                    <CFormSelect
                      value={selectedSpecie}
                      onChange={(e) => setSelectedSpecie(e.target.value)}
                      disabled={!selectedAnimal} // Disable until animal is selected
                      required
                    >
                      <option value="">Select Species</option>
                      {species.map(specie => (
                        <option key={specie.specieID} value={specie.specieID}>
                          {specie.specieName}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilImage} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      placeholder="Image"
                      autoComplete="image"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      required
                    />
                  </CInputGroup>


                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
