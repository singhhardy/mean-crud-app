import React, { useContext, useState } from 'react';
import { UsersContext } from '../ContextApi/UsersContext';

const AddNewUser = () => {
    const { newUser } = useContext(UsersContext);

    const [userData, setUserData] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        profileImage: null 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setUserData({
            ...userData,
            profileImage: e.target.files[0]
        })
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('age', userData.age);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('profileImage', userData.profileImage);
        newUser(userData); 
        setUserData({
            name: '',
            age: '',
            email: '',
            phone: '',
            profileImage: null
        });
    };


    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Add New User
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add New User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row g-3'>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Name</label>
                                    <input className='form-control' type='text' name='name' value={userData.name} onChange={handleChange} />
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Age</label>
                                    <input className='form-control' name='age' type='number' value={userData.age} onChange={handleChange} />
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Email</label>
                                    <input className='form-control' name='email' type='email' value={userData.email} onChange={handleChange} />
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Phone</label>
                                    <input className='form-control' type='number' name='phone' value={userData.phone} onChange={handleChange} />
                                </div>
                                <div className='col-lg-4'>
                                    <label className='form-label'>Profile Image</label>
                                    <input className='form-control' type='file' onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewUser;
