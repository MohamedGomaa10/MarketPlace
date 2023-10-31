import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Store Provider
import { Provider } from 'react-redux';

import { MasterStore } from './Services/MasterStore/MasterStore';

// React Router
import { BrowserRouter } from 'react-router-dom';

//loading
import Loading from './Components/Loading/Loading';

// React Toastify
import { ToastContainer } from 'react-toastify';

// Translation
import './Services/Translation/Translation';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import '@splidejs/react-splide/css';

import './index.css';

const Index = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

Index.render(
    <React.Fragment>
        <Provider store={ MasterStore }>
            <Suspense fallback={<Loading/>}>
                <BrowserRouter basename={'/'}>
                    <App />
                    <ToastContainer />
                </BrowserRouter>
            </Suspense>
        </Provider>
    </React.Fragment>
);

