import React, { FC } from 'react';

// React Router
import { Outlet } from "react-router-dom";

// Components
import NavMarketing from '../Components/MarketingNav/MarketingNav';
import MarketingSideMenu from '../Components/MarketingSideMenu/MarketingSideMenu';


const ContainerMarketing: FC = () => {
    return (
        <React.Fragment>
            <NavMarketing />
            <div className="app_marketing">
                <div className='app_container_marketing'>
                    <div className='SideMenu_Content'>                        
                        <MarketingSideMenu />
                    </div>
                    <div className='Container_body'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ContainerMarketing;