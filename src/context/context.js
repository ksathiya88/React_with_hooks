import React, {createContext, useState} from 'react';


export const UserContext = createContext({username:'',password:'',
                                              setUser:()=>{},setPassword:()=>{},isAuthenticated:false,login:()=>{}})



let UserProvider =(props)=>{
    var [user,setUserHandler]= useState('');
    var [password,setPasswordHandler]= useState('');
    var [authentication,setAuthenticationHandler]= useState(false);
    


    const loginHandler = () =>{
       
       console.log("Calling222222222222");
        if(user=="user" && password=="pass"){
           setAuthenticationHandler(true);
       }
    }

    return <UserContext.Provider value={{username:user,setUser:setUserHandler,
        password:password,setPassword:setPasswordHandler,
        isAuthenticated:authentication,
                                        login:loginHandler}}>
        {props.children}
        </UserContext.Provider>
}

export default UserProvider;

