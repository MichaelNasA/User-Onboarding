import './App.css';
import React, { useState }from 'react';

import axios from 'axios'


import schema from './validation/formSchema';
import * as yup from 'yup';

import Form from './Components/Form'

const initialFormValues = {
  username: '',
  password: '',
  email: '',
  tos: false
}

const initialFormErrors = {
  username: '',
  password: '',
  email: '',
  tos: ''
}


function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFromErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([])

  const handelSubmit = () =>{
    axios.post('https://reqres.in/api/user', formValues)
    .then(res =>{
      .setUsers([ res.data, ...users])
      .finally(() => setFormValues(initialFormValues))
    })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFromErrors({...formErrors, [name]: ''}))
      .catch(err => setFromErrors({...formErrors, [name]: err.errors[0] }))

  }

  const handelChange = (name, value) =>{
    validate(name, value);
    setFormValues({...formValues, [name]: value});
  }
  return (
    <div className="App">
      <Form 
      values={formValues} 
      change={handelChange} 
      errors={formErrors} 
      submit={handelSubmit}
      />
      {users.map(user => (
        <div key={user.id}>
          <p>{user.createdAt}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
