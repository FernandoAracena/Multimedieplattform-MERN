import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../context/AuthContext'

const LogIn = () => {
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const {login} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5555/users/login', {email, password})
        .then(result => {console.log(result)
            if(result.data === 'success!') {
                login(result.data)
                navigate('/home')
            }
        })
        .catch(err => console.log(err))
      }

  return (
    <div>
        <div>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor='eamil'>Email</label>
                <input
                type="text"
                placeholder="Enter email"
                autoComplete="off"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
        <label htmlFor='password'>Password</label>
                <input
                type="text"
                placeholder="Enter password"
                autoComplete="off"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
            <button type="submit">Log In</button>
        </form>
        </div>
    </div>
  )
}

export default LogIn
