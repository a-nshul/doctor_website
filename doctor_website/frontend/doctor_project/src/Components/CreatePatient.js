import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

function CreatePatient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [doctor, setDoctor] = useState('');

  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [doctorError, setDoctorError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    let isValid = true;
    setNameError('');
    setAgeError('');
    setGenderError('');
    setPhoneError('');

    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    }

    if (age.trim() === '') {
      setAgeError('Age is required');
      isValid = false;
    }

    if (gender.trim() === '') {
      setGenderError('Gender is required');
      isValid = false;
    } else if (!['male', 'female', 'other'].includes(gender.trim().toLowerCase())) {
      setGenderError('Gender should be male, female, or other');
      isValid = false;
    }

    if (phone.trim() === '') {
      setPhoneError('Phone is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.trim())) {
      setPhoneError('Phone number should be 10 digits');
      isValid = false;
    }
    if (doctor.trim() === '') {
      setDoctorError('Doctor is required');
      isValid = false;
    }
    if (isValid) {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await axios.post('http://localhost:3000/api/patient', {
          name,
          age,
          gender,
          phone,
          doctor
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        console.log('Patient created:', response.data);
        message.success('Patient created successfully');
        navigate('/fetchPatient');
      } catch (error) {
        console.error('Error creating patient:', error);
        message.error('Patient create failed. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Patient</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label"><strong>Patinet Name</strong></label>
          <input
            type="text"
            className={`form-control ${nameError && 'is-invalid'}`}
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label"><strong>Age</strong></label>
          <input
            type="number"
            className={`form-control ${ageError && 'is-invalid'}`}
            id="age"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {ageError && <div className="invalid-feedback">{ageError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label"><strong>Gender</strong></label>
          <select
            className={`form-control ${genderError && 'is-invalid'}`}
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {genderError && <div className="invalid-feedback">{genderError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label"><strong>Phone</strong></label>
          <input
            type="number"
            className={`form-control ${phoneError && 'is-invalid'}`}
            id="phone"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <div className="invalid-feedback">{phoneError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="doctor" className="form-label"><strong>Doctor Name</strong></label>
          <input
            type="text"
            className={`form-control ${doctorError && 'is-invalid'}`}
            id="doctor"
            placeholder="Enter doctor number"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          />
          {doctorError && <div className="invalid-feedback">{doctorError}</div>}
        </div>
        <button type="button" className="btn btn-primary mr-2" onClick={handleSubmit}>Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </form>
    </div>
  );
}

export default CreatePatient;
