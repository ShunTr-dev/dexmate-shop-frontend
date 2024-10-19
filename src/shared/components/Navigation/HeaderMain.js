import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { useTranslation } from 'react-i18next';

import CartContext from '../../context/cart-context';
import HeaderExtras from './HeaderExtras';

const HeaderMain = () => {
    const { t } = useTranslation();

    const auth = useContext(AuthContext);
    const cartCtx = useContext(CartContext);

    const logoutHandler = () => {
        cartCtx.clearCart(); // Hacer que esto se pueda hacer en la acción del logout
        auth.logout();
    };

    //<div className="lines-button x"><span className="lines"></span></div> display: inline-block;
    return (
        <header id="header" className="header-sticky sticky-active" data-fullwidth="true">
            <div className="header-inner">
                <div className="container">
                    <div id="logo">
                        {' '}
                        <NavLink to="/">
                            <span className="logo-default">{process.env.REACT_APP_SHOP_NAME.toUpperCase()}</span>
                            <span className="logo-dark">{process.env.REACT_APP_SHOP_NAME.toUpperCase()}</span>
                        </NavLink>{' '}
                    </div>
                    <HeaderExtras></HeaderExtras>
                    <div id="mainMenu-trigger">
                        {cartCtx.totalElements > 0 && (
                            <div
                                className="lines-button"
                                style={{
                                    display: 'inline-block',
                                    fontSize: '24px',
                                    marginLeft: '20px',
                                    padding: '0px',
                                    color: 'black',
                                }}
                            >
                                <NavLink to="/cart" style={{ color: 'black' }}>
                                    <i className="icon-shopping-cart"></i>
                                </NavLink>
                            </div>
                        )}

                        {auth.isLoggedIn && (
                            <div
                                className="lines-button"
                                style={{
                                    display: 'inline-block',
                                    fontSize: '24px',
                                    marginLeft: '20px',
                                    padding: '0px',
                                }}
                            >
                                <NavLink to="/orders" style={{ color: 'black' }}>
                                    <i className="icon-package"></i>
                                </NavLink>
                            </div>
                        )}
                        {!auth.isLoggedIn && (
                            <div
                                className="lines-button"
                                style={{
                                    display: 'inline-block',
                                    fontSize: '24px',
                                    marginLeft: '20px',
                                    padding: '0px',
                                }}
                            >
                                <NavLink to="/login" style={{ color: 'black' }}>
                                    <i className="icon-user"></i>
                                </NavLink>
                            </div>
                        )}
                        {auth.isLoggedIn && (
                            <div
                                className="lines-button"
                                style={{
                                    display: 'inline-block',
                                    fontSize: '24px',
                                    marginLeft: '20px',
                                    padding: '0px',
                                }}
                            >
                                <NavLink onClick={logoutHandler} style={{ color: 'black' }}>
                                    <i className="icon-user-x"></i>
                                </NavLink>
                            </div>
                        )}
                    </div>
                    <div id="mainMenu">
                        <div className="container">
                            <nav>
                                <ul>
                                    {auth.isLoggedIn && (
                                        <li>
                                            <NavLink to="/login">{auth.userEmail}</NavLink>
                                        </li>
                                    )}
                                    <li>
                                        <NavLink to="/categories/list">{t('navigation.categories')}</NavLink>
                                    </li>

                                    {cartCtx.totalElements > 0 && (
                                        <li>
                                            <NavLink to="/cart">
                                                {t('navigation.cart')}
                                                <span className="badge bg-danger">{cartCtx.totalElements}</span>
                                            </NavLink>
                                        </li>
                                    )}

                                    {auth.isLoggedIn && auth.isAdmin && (
                                        <li className="dropdown">
                                            <a href="#">{t('navigation.admin')}</a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink to="/admin/dashboard">{t('navigation.dashboard')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/admin/logs">{t('system.logs')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/admin/error-logs">{t('system.errorLogs')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/admin/products/list">
                                                        {t('navigation.products')}
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/admin/categories/list">
                                                        {t('navigation.categories')}
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/admin/orders/list">{t('cart.orders')}</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    )}

                                    {auth.isLoggedIn && (
                                        <li>
                                            <NavLink to="/orders">{t('cart.orders')}</NavLink>
                                        </li>
                                    )}
                                    {!auth.isLoggedIn && (
                                        <li>
                                            <NavLink to="/login">{t('navigation.login')}</NavLink>
                                        </li>
                                    )}
                                    {auth.isLoggedIn && (
                                        <li>
                                            <NavLink onClick={logoutHandler}>{t('navigation.logout')}</NavLink>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderMain;
