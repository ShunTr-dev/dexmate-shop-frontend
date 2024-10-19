import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    const [userEmail, setUserEmail] = useState(false);
    const [isAdmin, setIsAdmmin] = useState(false);

    const login = useCallback((uid, userEmail, cart, isAdmin, token, expirationDate) => {
        //console.log('Auth hook login');
        setToken(token);
        setUserId(uid);
        setUserEmail(userEmail);
        setIsAdmmin(isAdmin);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 60 * 60000 * 500);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                userEmail: userEmail,
                isAdmin: isAdmin,
                token: token,
                expiration: tokenExpirationDate.toISOString(),
            })
        );

        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        if (cartProducts) {
            //subimos el carrito a la nube
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/carts/update`, cartProducts);
            //console.log('Actualizando carrito en la nube');
        } else {
            localStorage.setItem(
                'cartProducts',
                JSON.stringify({
                    totalElements: cart.totalElements,
                    totalPrice: cart.totalPrice,
                    products: cart.products,
                })
            );
        }

        // TO DO: tenemos hacer un reload de la página para que se actualice el carrito
        //window.location.reload('/');
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('userData');
        localStorage.removeItem('cartProducts');

        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        setUserEmail(null);
        setIsAdmmin(false);

        //cartCtx.clearCart(); // TO DO: Hacer que se borre con la página (se borra pero hasta que no se recarga la página no hace nada a menos que se haga un reload)
        //window.location.reload(false);
    }, []);

    useEffect(() => {
        // Tiempo de expiración del token
        if ((token && tokenExpirationDate) || localStorage.getItem('userData')) {
            let remainingTime;
            if (token && tokenExpirationDate) {
                remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            } else {
                const storedData = JSON.parse(localStorage.getItem('userData'));
                remainingTime = new Date(storedData.expiration).getTime() - new Date().getTime();
            }
            logoutTimer = setTimeout(logout, remainingTime);
            //console.log('creando logoutTimer');
            //console.log('tokenExpirationDate', tokenExpirationDate);
        } else {
            clearTimeout(logoutTimer);
            logout();
            //console.log('tokenExpirationDate', tokenExpirationDate);
            //console.log('borrando logoutTimer');
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        // plantearse hacer un loader por que la primera vez que hace esto el usuario no está logueado
        const storedData = JSON.parse(localStorage.getItem('userData'));
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(
                storedData.userId,
                storedData.userEmail,
                cartProducts,
                storedData.isAdmin,
                storedData.token,
                new Date(storedData.expiration)
            ); //gracias al callback solo se ejecuta una vez
        }
    }, [login]);

    return { token, login, logout, userId, userEmail, isAdmin };
};
