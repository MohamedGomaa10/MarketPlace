import React, { FC } from 'react';

// Routes
import  MasterRoutes  from "./MasterRoutes";

// Interfaces
interface NavProviderInf {
    children?: React.ReactNode;
}

export const RoutesProvider: FC<NavProviderInf> = ({ children }) => {
    return (
        <React.Fragment>
            { children }
            <MasterRoutes />
        </React.Fragment>
    )
}