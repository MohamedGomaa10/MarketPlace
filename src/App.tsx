import React, {FC, useEffect, useState} from 'react';

import jwtDecode from 'jwt-decode';

// React Router
import { useNavigate } from 'react-router-dom';

//style
import './App.css'

//routes
import {RoutesProvider} from './Routes/RouteProvider';
import RequestProvider from './Middleware/Requests/RequestProvider';

const App: FC = () => {
  const Navigate = useNavigate();
  const [Token] = useState(localStorage.getItem('token'));

  useEffect(()=>{
      const decodedToken = Token && jwtDecode<any>(Token);
      const currentTime = Date.now() / 1000;
      if (decodedToken && decodedToken.exp < currentTime) {
        localStorage.clear();
        Navigate('/login', { replace: true })
      }
  },[Token, Navigate]);

  return (
    <React.Fragment>
        <RequestProvider>
          <RoutesProvider>
          </RoutesProvider>
        </RequestProvider>
    </React.Fragment>
  )
}

export default App