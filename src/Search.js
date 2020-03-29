
import Card from './UI/Card';
import './Search.css';
import { useState, useEffect,useRef, useReducer, useCallback } from 'react';
import React from 'react';
import axios from 'axios';
import LoadingIndicator from './UI/LoadingIndicator';
import ErrorModal from './UI/ErrorModal';


const reducerStore = (currentIngredentiats,action)=>{
switch(action.type){
    case "COMPLETED":
        return {"loading":false,"error":null}
    case "PENDING":
        return {"loading":true,"error":null}
    case "ERROR":
        return {"loading":false,"error":true} 
    case "CLEAR":
        return {"loading":false,"error":null}    
}
}

const Search = React.memo((props) => {

    const [enteredFilter,setEnteredFilter]= useState('');
    const {onGetEmployees} = props;
    const inputRef = useRef();
    const [httpState,dispatch] = useReducer(reducerStore,{})


    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR' });
      }, []);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(enteredFilter===inputRef.current.value){
         dispatch({"type":"PENDING"});
        axios.get('http://localhost:8081/getEmployees111').then((employees) => {
            console.log("Employees", employees);
            onGetEmployees(employees.data);
            dispatch({"type":"COMPLETED"});
        },(error)=>{
           dispatch({"type":"ERROR"});
        });
    }
    },500);

    return (()=>{
        clearTimeout(timer);
    });

    },[enteredFilter]);


    return (
        <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={inputRef}
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
      {httpState.loading && <LoadingIndicator/>}
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
    </section>
    )
});

export default Search;