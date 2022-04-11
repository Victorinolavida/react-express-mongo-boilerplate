import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import authContext from '../state/state';
import * as EmailValidator from 'email-validator';

import '../styles/registro.css';
// eslint-disable-next-line import/no-unresolved
import { FormInput } from '../components/FormInput';

export const Register = () => {
  const { user, register } = useContext(authContext);

  const [dataForm, setDataForm] = useState({
    nombre: '',
    email: '',
    password1: '',
    password2: ''
  });

  const onChange = e => {
    const { name, value } = e.target;
    setDataForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const registro = e => {
    e.preventDefault();

    const { nombre, email, password1, password2 } = dataForm;

    if (nombre.length < 3) {
      return console.error('el nombre debe tener mas de 3 caracteres');
    }
    if (!EmailValidator.validate(email)) {
      return console.error('Escribe un email valido');
    }
    if (password1.length <= 5) {
      return console.error('La contraseña debe ser mayot a 5 caracteres');
    }

    if (password1 !== password2) {
      return console.log('Las contraseñas no coinciden');
    }

    register(nombre, email, password1, password2);
  };

  return (
    <>
      <div className="container formulario-container">
        <form className="form-control formulario ">
          <FormInput label="Nombre" id="nombre" placeholder="Juan Carlos" onChange={onChange} />
          <FormInput
            label="Email"
            id="email"
            placeholder="juan_carlos@mail.com"
            onChange={onChange}
          />
          <FormInput
            label="Password"
            id="password1"
            type="password"
            onChange={onChange}
            placeholder="Password"
          />
          <FormInput
            label="confirma tu password"
            id="password2"
            type="password"
            placeholder="Confirmar password"
            onChange={onChange}
          />
          ¿Ya tienes una cuenta? <Link to="/login">logueate aqui</Link>
          <br />
          <button type="submit" className="btn btn-primary" onClick={registro}>
            Registrarse
          </button>
        </form>
        {user.islogged ? <Redirect to="/" /> : <Redirect to="/registro" />}
      </div>
    </>
  );
};
