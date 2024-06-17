import React, { useContext } from 'react'
import { UsersContext } from '../ContextApi/UsersContext'
import AddNewUser from './AddNewUser'

const Users = () => {
    const {users, deleteUser} = useContext(UsersContext)

    const confirmDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(userId);
        }
    }

  return (
    <>

    <div className='card'>
        <div className='card-header d-flex align-items-center justify-content-between bg-secondary'>
            <div className='card-title text-light mb-0'>Users Data</div>
            <div>
                <AddNewUser />
            </div>
        </div>
        <div className='card-body p-0'>
            <div className='table-responsive'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className='text-nowrap'>
                                    <button className='btn btn-danger me-2 btn-sm' onClick={() => confirmDelete(user._id)}>Delete</button>
                                    <button className='btn btn-warning btn-sm'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Users