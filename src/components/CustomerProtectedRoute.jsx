import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCustomerAuth } from '../context/CustomerAuthContext';

const CustomerProtectedRoute = ({ children }) => {
    const { customer, loading } = useCustomerAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!customer) {
        // Redirect to Auth page, but maybe save the location they tried to access?
        // For now, simple redirect.
        return <Navigate to="/auth" replace state={{ from: location }} />;
    }

    return children;
};

export default CustomerProtectedRoute;
