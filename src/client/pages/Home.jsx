import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import userContext from '../state/state';

export const Home = () => {
  const { user, logout } = useContext(userContext);
  const { nombre, islogged } = user;
  console.log(user, 'usuario-home');
  const logoutHandler = () => {
    // setUser({ nombre: '', uid: '', islogged: false });
    localStorage.clear('token');
    logout(islogged);
    // console.log(user);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-4">App test </h1>
        <div className="d-flex justify-content-between d-print-inline-block align-middle mt-5">
          <h4 className="text-center">
            Bienvenido: <span className="text-primary"> {nombre} </span>
          </h4>

          <button onClick={logoutHandler} className="logout btn btn-danger">
            Logout
          </button>
        </div>

        <img
          src="https://i.pinimg.com/564x/8e/f7/26/8ef726cc8bae5adcedbb0b6cd1a873fe.jpg"
          alt="emoji"
        />
        <br />
      </div>

      {!islogged ? <Redirect to="/login" /> : <Redirect to="/" />}
    </>
  );
};
