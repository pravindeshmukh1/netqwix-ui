import socketio from 'socket.io-client';
import {createContext, useEffect, useState} from 'react';
const URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const getSocket = () => {
  const [token, setToken] = useState (null);
  useEffect (() => {
    setToken (localStorage.getItem ('token'));
  }, []);

  if (token) {
    return socketio.connect (URL, {
      query: {authorization: token, autoConnect: true},
    });
  } else {
    // return socketio.connect (URL);
  }
};

export const SocketContext = createContext();
