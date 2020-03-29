import React from 'react';
import './login.css';
import { useContext } from 'react';
import { UserContext } from '../../context/context';

const styles = {
    padding: '5px',
    display:'block',
    margin:'auto',
    marginBottom: '10px'
};

const label_style = {
    padding: '5px',
    display:'block',
    marginBottom:'5px',
    margin:'auto',
    textAlign:'center'
};

const error_style = {
    padding: '5px',
    display:'block',
    marginBottom:'5px',
    margin:'auto',
    textAlign:'center',
    color:'red'
};


const Login = (props)=> {
    const userContext = useContext(UserContext);
    return (<div className="loginForm">
        <label style={label_style} >Username:</label><input style={styles} placeholder='UserName'
                        value={userContext.username}
                        onChange={(event)=>{userContext.setUser(event.target.value)}} />
        <label style={label_style} >Password:</label>
            <input style={styles} placeholder='Password'
                        value={userContext.password}
                        onChange={(event)=>{userContext.setPassword(event.target.value)}} />
        <button style={styles} onClick={userContext.login} type='button'>Log in</button>
        
        <label style={error_style}>{props.error}</label>
    </div>);
};

export default Login;
