import React, {useState} from 'react'
import '../Styles/Register.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register({user, onUserUpdate}) {

    let navigate = useNavigate();

    const [newUser, setNewUser] = useState({
      name: "",
      username: "",
      password: "",
    });
    const {name, username, password} = newUser;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await axios.post("http://localhost:8080/register", user);
        onUserUpdate(newUser);
        navigate("/profile");
    };

    /*  
    e is short for event that is happening (change). 
    target is element that triggered the event (input/typing)
    value is value of input from user
    
    below sets name to value user entered. spread operator
    applies that to all parameters in user
    */

    const handleNewUser = (e) => {
      setNewUser({...newUser, [e.target.name] : e.target.value});
    }

  return (
    /* id = HTML elements 
    Name identifies the html tag when the data is sent when the form is submitted.
    Name is identifier for Value and value is the actual value
    Value is the real value of the html tag. 
    ie name="username" value="john"*/
    <div className='form-container'>
        <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor='name'>Full Name</label>
            <input value={name} onChange={(e) => handleNewUser(e)} placeholder='Full Name' name='name' type='text' id='name'/>
            <label htmlFor='username'>Username</label>
            <input value={username} onChange={(e) => handleNewUser(e)} placeholder='Enter username' name='username' type='username' id='username'/>
            <label htmlFor='password'>Password</label>
            <input value={password} onChange={(e) => handleNewUser(e)} placeholder='Enter password' name='password' type='password' id='password'/>
            <button>Register</button>
        </form> 
    </div>
  )
}

export default Register