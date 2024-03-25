import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Modal, message } from 'antd';

const PatientTable = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [editPatient, setEditPatient] = useState({
        id: '',
        name: '',
        age: '',
        gender: '',
        phone: '',
        doctor: ''
    });
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const authToken = localStorage.getItem('authToken');
        try {
            const response = await fetch('http://localhost:3000/api/patient/', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPatients(data.patient || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const showDeleteModal = (patientId) => {
        setPatientToDelete(patientId);
        setDeleteModalVisible(true);
    };

    const handleDelete = async () => {
        if (patientToDelete) {
            const authToken = localStorage.getItem('authToken');
            try {
                const response = await fetch(`http://localhost:3000/api/patient/${patientToDelete}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to delete patient');
                }
                fetchData();
                message.success('Patient deleted successfully');
            } catch (error) {
                console.error('Error deleting patient:', error);
            }
            setDeleteModalVisible(false);
        }
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };

    const handleEdit = (patientId) => {
        const patient = patients.find(patient => patient._id === patientId);
        console.log("Selected Patient:", patient);
        if (patient) {
            setEditPatient({
                ...patient,
                id: patient._id 
            });
            setEditModalVisible(true);
        } else {
            console.error('Patient not found');
        }
    };
    const handleUpdate = async () => {
        console.log("Edit Patient:", editPatient);
        const authToken = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:3000/api/patient/${editPatient.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify(editPatient)
            });
            const responseData = await response.json(); 
            console.log("Update Response:", responseData); 
            if (!response.ok) {
                throw new Error('Failed to update patient');
            }
            fetchData();
            message.success("Patient updated successfully");
        } catch (error) {
            console.error('Error updating patient:', error);
            message.error('Patient update failed. Please try again.');
        }
        setEditModalVisible(false);
    };
    
    
    
    const handleCancelEdit = () => {
        setEditModalVisible(false);
    };
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log("Updated Edit Patient:", editPatient); 
    };
    
    const handleLogout = () => {
        setLogoutModalVisible(true); 
    };

    const confirmLogout = () => {
        try {
            navigate('/');
            message.success('Successfully logged out');
            setLogoutModalVisible(false); 
        } catch (error) {
            message.error('Error logging out');
        }
    };

    const cancelLogout = () => {
        setLogoutModalVisible(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
            <h1>Patient List</h1>
            <Link to="/patient" className="btn btn-success mb-3">Add Patient</Link>
            {patients.length === 0 ? (
                <p>No patients available.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Doctor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient._id}>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.doctor}</td>
                                <td>
                                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(patient._id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => showDeleteModal(patient._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal
                title="Confirmation"
                visible={deleteModalVisible}
                onCancel={handleCancelDelete}
                footer={[
                    <button key="cancel" className="btn btn-secondary" onClick={handleCancelDelete}>
                        Cancel
                    </button>,
                    <button key="yes" className="btn btn-danger" onClick={handleDelete}>
                        Yes
                    </button>
                ]}
            >
                <p>Are you sure you want to delete this patient?</p>
            </Modal>

            <Modal
                title="Edit Patient"
                visible={editModalVisible}
                onOk={handleUpdate}
                onCancel={handleCancelEdit}
            >
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" value={editPatient.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" className="form-control" name="age" value={editPatient.age} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select className="form-control" name="gender" value={editPatient.gender} onChange={handleInputChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" name="phone" value={editPatient.phone} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Doctor</label>
                        <input type="text" className="form-control" name="doctor" value={editPatient.doctor} onChange={handleInputChange} />
                    </div>
                </form>
            </Modal>
            <Modal
                    title="Confirmation"
                    visible={logoutModalVisible}
                    onCancel={cancelLogout}
                    footer={[
                        <button key="cancel" className="btn btn-secondary" onClick={cancelLogout}>
                            Cancel
                        </button>,
                        <button key="logout" className="btn btn-danger" onClick={confirmLogout}>
                            Logout
                        </button>
                    ]}
                >
                    <p>Are you sure you want to log out?</p>
            </Modal>
        </div>
    );
};

export default PatientTable;

