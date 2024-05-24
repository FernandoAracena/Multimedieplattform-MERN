import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5555/users/register', {name, email, password})
    .then(result => {
      console.log(result);
      navigate('/users/login');
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}> 
            <div>
                <label htmlFor='name'>Name :</label>
                <input
                type="text"
                placeholder="Enter name"
                autoComplete="off"
                name="name"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='email'>Email :</label>
                <input
                type="text"
                placeholder="Enter email"
                autoComplete="off"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='password'>Password :</label>
                <input
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">SignUp</button>
          </form>
          <p>Already have an account?</p>
            <Link to="/users/login">Log In</Link>
      </div>
    </div>
  )
}

export default SignUp;
