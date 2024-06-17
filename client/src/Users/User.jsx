import React, { useContext } from 'react'
import { UsersContext } from '../ContextApi/UsersContext'

const User = () => {
    const user = useContext(UsersContext)

  return (
    <div>
        <h1>{user.map((user) => (
            <div key={user._id}>
                {user._id}
            </div>
        ))}</h1>
    </div>
  )
}

export default User