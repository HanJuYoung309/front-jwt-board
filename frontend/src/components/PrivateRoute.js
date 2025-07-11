// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

function PrivateRoute() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;