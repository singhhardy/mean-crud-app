import React, { createContext, useState, useEffect} from "react";

const UsersContext = createContext()

const UsersProvider = ({ children }) => {
    const [users, setUsers] =  useState([]);

    const apiUrl = 'http://localhost:5000'

    // Get All Users
    useEffect(() => {
    fetch(`${apiUrl}/api/users`)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(err => console.log(`Error fetching users :`, err))
    }, [])

    // DELETE a user
    const deleteUser = ((userId) => {
        fetch(`${apiUrl}/api/users/${userId}`, { method: 'DELETE'})
        .then(response => {
            if(response.ok){
                setUsers(users.filter(user => user._id !== userId))
            } else{
                console.log('Failed to Delete User')
            }
        })
        .catch(err => {
            console.log(err)
        })
    })

    const newUser = (userData) => {
        fetch(`${apiUrl}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            setUsers([...users, data]);
        })
        .catch(err => {
            console.log('Error adding new user:', err);
        });
    };
    
    return (
        <UsersContext.Provider value={{ users, deleteUser, newUser }}>
            {children}
        </UsersContext.Provider>
    )
    
}


export { UsersContext, UsersProvider};