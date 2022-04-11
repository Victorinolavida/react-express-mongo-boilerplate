import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {AuthContext} from '../state/state';

export const Home = () => {
  const { user, logout } = useContext(AuthContext);

  // se comprueba  si hay un usuario logueado, si no redirige al login
  if(!user) return(<Redirect to="/login" />) 

  // con la validacion pasada. podemos usar el nombre que viene en el user
  const { name } = user;
  console.log(!user || 'hola')
  const logoutHandler = () => {
    localStorage.clear('token');
    logout(user);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-4">App test </h1>
        <div className="d-flex justify-content-between d-print-inline-block align-middle mt-5">
          <h4 className="text-center">
            Bienvenido: <span className="text-primary"> {name}</span>
          </h4>

          <button  onClick={logoutHandler} className="logout btn btn-danger">
            Logout
          </button>
        </div>

        <img
          src="https://i.pinimg.com/564x/8e/f7/26/8ef726cc8bae5adcedbb0b6cd1a873fe.jpg"
          alt="emoji"
        />
        <br />
      </div>

      
    </>
  );
};
