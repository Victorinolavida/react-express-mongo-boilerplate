import React, { useEffect, useState } from 'react'
import { AuthContext } from '../state/state'
import {decodeToken} from '../helpers/jwt'

export const AuthProvider = ({children}) => {


  const [user, setUser] = useState(null);

  const login = (email = '', password = '') => {
    if (!email || !password) return;

    fetch('http://localhost:4000/api/login', {
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
        setUser({ ...decodeToken(data.token) });
      })
      .catch(console.log);
  };

  const register = (nombre, email, password1, password2) => {
    fetch('http://localhost:4000/api/registro', {
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
        if (decodeToken) setUser({ ...decodeToken(data.token) });
      });
  };
  const logout = user => {
    !user || setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log(token, 'hola');
    if (token) {
      fetch('http://localhost:4000/api/renew', {
        headers: {
          token
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            localStorage.setItem('token', data.token);
          
            setUser({ ...decodeToken(token) });
       
          }
        });
    }
  }, []);

  const test =()=>{
    console.log('HOLA')

    setUser('hola')
  }



  return (
    <AuthContext.Provider value={{user,login,logout}}>
        {
          children
        }
    </AuthContext.Provider>
  )
}
