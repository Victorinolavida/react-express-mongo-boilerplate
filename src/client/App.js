import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { decodeToken } from './helpers/jwt';
import { Login, Register, Home } from './pages/';
import authContext from './state/state';
// import usuarioContexto from './state/state';

export default function App() {
  const [user, setUser] = useState({ islogged: false });

  const login = (email = '', password = '') => {
    if (!email || !password) return;

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(resp => resp.json())
      .then(data => {
        // guarda el token en el localStorage
        localStorage.setItem('token', data.token);
        // cambia el estado de logeado a true
        setUser({ ...decodeToken(data.token), islogged: true });
      })
      .catch(console.log);
  };

  const register = (nombre, email, password1, password2) => {
    fetch('http://localhost:3000/api/registro', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, password1, password2 })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        // si existe  token , pasa a setear el  token, pero antes lo decifra
        if (decodeToken) setUser({ ...decodeToken(data.token), islogged: true });
      });
  };
  const logout = isLogin => {
    !isLogin || setUser({ islogged: false });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log(token, 'hola');
    if (token) {
      fetch('http://localhost:3000/api/renew', {
        headers: {
          token
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            localStorage.setItem('token', data.token);
            console.log(decodeToken(token));
            setUser({ ...decodeToken(token), islogged: true });
            // login(nombre, uid);
            // setUser(p => ({
            //   ...p,
            //   islogged: true
            // }));
          }
        });
    }
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout, register }}>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registro">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </authContext.Provider>
  );
}
