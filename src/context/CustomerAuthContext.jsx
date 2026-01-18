import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerAuthContext = createContext();

export const useCustomerAuth = () => useContext(CustomerAuthContext);

export const CustomerAuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    // Remove navigate from here to avoid circular dependency if provider is inside Router but used outside.
    // Actually, usually Provider is inside Router.

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('customerToken');
            const userStr = localStorage.getItem('customerUser');
            if (token && userStr) {
                try {
                    setCustomer(JSON.parse(userStr));
                } catch (e) {
                    console.error("Failed to parse customer user", e);
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = (token, user) => {
        localStorage.setItem('customerToken', token);
        localStorage.setItem('customerUser', JSON.stringify(user));
        setCustomer(user);
    };

    const logout = () => {
        localStorage.removeItem('customerToken');
        localStorage.removeItem('customerUser');
        setCustomer(null);
        // Note: Navigation usually handled by component calling logout
    };

    return (
        <CustomerAuthContext.Provider value={{ customer, login, logout, loading }}>
            {children}
        </CustomerAuthContext.Provider>
    );
};
