import React, { FC } from 'react';

// React Router
import { Outlet } from "react-router-dom";

// Components
import Footer from '../Components/Footer/Footer';
import Nav from '../Components/NavMenu/Nav';
import FooterTop from '../Components/FooterTop/FooterTop';


const Container: FC = () => {
    return (
        <React.Fragment>
            <Nav />
            <div className="app">
                <div className='app_container'>
                    <Outlet />
                    <FooterTop />
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Container;