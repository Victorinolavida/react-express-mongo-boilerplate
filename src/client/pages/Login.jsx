import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {AuthContext} from '../state/state';
import '../styles/registro.css';
// eslint-disable-next-line import/no-unresolved
import { FormInput } from '../components/FormInput';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  
  const { user, login} = useContext(AuthContext);

  const a = useContext(AuthContext);

  const onChance = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = e => {
    e.preventDefault();
    const { email, password } = formData;
    login(email, password)

  };

  return (
    <>
      <div className="container formulario-container">
        <form className="form-control formulario ">
          <FormInput label="Email" id="email" onChange={onChance} />
          <FormInput label="Password" id="password" type="password" onChange={onChance} />
          ¿No tienes cuenta? <Link to="/registro"> registrate aqui</Link>
          <button type="submit" className="btn btn-primary d-block " onClick={submit}>
            Login
          </button>
        </form>
      </div>

      {user ? <Redirect to="/" /> : <Redirect to="/login" />}
    </>
  );
};
