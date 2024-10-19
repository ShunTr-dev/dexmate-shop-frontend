import React, { Suspense } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import { SpeedInsights } from '@vercel/speed-insights/react';

import CartProviderContext from './shared/util/CartProviderContext';
import HomePage from './pages/homepage/HomePage';
import ProductSingle from './pages/products/ProductSingle';
import ProductsList from './pages/products/ProductsList';
import RootLayout from './pages/RootLayout';
import Categories from './pages/categories/Categories.js';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Cart from './pages/cart/Cart';
import Orders from './pages/orders/Orders';
import Checkout from './pages/cart/Checkout';
import CheckoutSuccess from './pages/cart/CheckoutSuccess';
import CheckoutError from './pages/cart/CheckoutError';
import PageNotFound from './pages/error/PageNotFound';
import TermsOfservice from './pages/legal/TermsOfService';
import CookiePolicy from './pages/legal/CookiePolicy';
import DexmateFeatures from './pages/legal/DexmateFeatures';

import './plugins.css';
import './style.css';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import UnsubscribeNewsletter from './pages/user/UnsubscribeNewsletter';
import PasswordReset from './pages/auth/PasswordReset';
import PasswordResetSendEmail from './pages/auth/PasswordResetSendEmail';
import PasswordResetSuccessfully from './pages/auth/PasswordResetSuccessfully';
import InvalidToken from './pages/error/InvalidToken';
import Invoices from './pages/orders/Invoices';
import Logs from './pages/admin/logs/Logs';
import ErrorLogs from './pages/admin/logs/ErrorLogs';

import { transitions, positions, Provider as AlertProvider } from './shared/components/Alert/react-alert';
import AlertTemplate from './shared/components/Alert/AlertTemplate';
import AdminProductsList from './pages/admin/products/AdminProductsList';
import AdminProductAdd from './pages/admin/products/AdminProductAdd';
import AdminProductEdit from './pages/admin/products/AdminProductEdit';
import AdminProductGenerateWithAI from './pages/admin/products/AdminProductGenerateWithAI';
import AdminCategoriesList from './pages/admin/categories/AdminCategoriesList';
import AdminCategoriesAdd from './pages/admin/categories/AdminCategoriesAdd';
import AdminCategoriesEdit from './pages/admin/categories/AdminCategoriesEdit';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import AdminOrders from './pages/admin/orders/AdminOrders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <PageNotFound />,
        id: 'root',
        //loader: tokenLoader,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'products',
                children: [
                    {
                        index: true,
                        element: <ProductsList />,
                        //loader: eventsLoader,
                    },
                    {
                        path: ':productId',
                        id: 'product-detail',
                        element: <ProductSingle />,
                        //loader: eventDetailLoader,
                    },
                    {
                        path: 'list',
                        id: 'product-list',
                        element: <ProductsList />,
                        //loader: eventDetailLoader,
                    },
                    {
                        path: 'category/:categoryId',
                        id: 'product-list-by-category',
                        element: <ProductsList />,
                        //loader: eventDetailLoader,
                    },
                    {
                        path: 'add-wizard',
                        element: <AdminProductGenerateWithAI />,
                    },
                ],
            },
            {
                path: 'categories',
                children: [
                    {
                        index: true,
                        //element: <ProductsList />,
                        //loader: eventsLoader,
                    },
                    {
                        path: 'list',
                        id: 'categories-list',
                        element: <Categories />,
                        //loader: eventDetailLoader,
                    },
                ],
            },
            {
                path: 'cart',
                children: [
                    {
                        index: true,
                        id: 'cart-list',
                        element: <Cart />,
                    },
                    {
                        path: 'checkout',
                        element: <Checkout />,
                    },
                    {
                        path: 'checkout-success/:orderId',
                        element: <CheckoutSuccess />,
                    },
                    {
                        path: 'checkout-error/:orderId',
                        element: <CheckoutError />,
                    },
                ],
            },
            {
                path: 'orders',
                children: [
                    {
                        index: true,
                        id: 'order-list',
                        element: <Orders />,
                    },
                    {
                        path: 'checkout',
                        element: <Orders />,
                    },
                    {
                        path: 'checkout-success/:orderId',
                        element: <Orders />,
                    },
                    {
                        path: 'checkout-error/:orderId',
                        element: <Orders />,
                    },
                    {
                        path: 'invoice/:orderId',
                        element: <Invoices />,
                    },
                ],
            },
            {
                path: 'user',
                children: [
                    {
                        index: true,
                        id: 'user',
                    },
                    {
                        path: 'unsubscribe/:unsubscribeToken',
                        element: <UnsubscribeNewsletter />,
                    },
                    {
                        path: 'password-reset/:resetPasswordToken',
                        element: <PasswordReset />,
                    },
                    {
                        path: 'password-reset-email',
                        element: <PasswordResetSendEmail />,
                    },
                    {
                        path: 'password-reset-successfully',
                        element: <PasswordResetSuccessfully />,
                    },
                    {
                        path: 'password-reset-error',
                        element: <InvalidToken />,
                    },
                ],
            },
            {
                path: 'legal',
                children: [
                    {
                        path: 'terms-of-service',
                        element: <TermsOfservice />,
                    },
                    {
                        path: 'cookies',
                        element: <CookiePolicy />,
                    },
                    {
                        path: 'features',
                        element: <DexmateFeatures />,
                    },
                ],
            },
            {
                path: 'features',
                id: 'features',
                element: <DexmateFeatures />,
            },
            {
                path: 'login',
                index: true,
                id: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                index: true,
                id: 'register',
                element: <Register />,
            },
            {
                path: 'admin',
                children: [
                    {
                        path: 'dashboard',
                        element: <AdminDashboard />,
                    },
                    {
                        path: 'logs',
                        element: <Logs />,
                    },
                    {
                        path: 'error-logs',
                        element: <ErrorLogs />,
                    },
                    {
                        path: 'products',
                        //element: <AdminProductsList />,
                        children: [
                            {
                                path: 'list',
                                element: <AdminProductsList />,
                            },
                            {
                                path: 'add',
                                element: <AdminProductAdd />,
                            },
                            {
                                path: 'edit/:productId',
                                element: <AdminProductEdit />,
                            },
                        ],
                    },
                    {
                        path: 'categories',
                        //element: <AdminProductsList />,
                        children: [
                            {
                                path: 'list',
                                element: <AdminCategoriesList />,
                            },
                            {
                                path: 'add',
                                element: <AdminCategoriesAdd />,
                            },
                            {
                                path: 'edit/:categoryId',
                                element: <AdminCategoriesEdit />,
                            },
                        ],
                    },
                    {
                        path: 'orders',
                        //element: <AdminProductsList />,
                        children: [
                            {
                                path: 'list',
                                element: <AdminOrders />,
                            },
                            {
                                path: 'pending',
                                element: <AdminOrders />,
                            },
                            {
                                path: 'completed',
                                element: <AdminOrders />,
                            },
                            {
                                path: 'cancelled',
                                element: <AdminOrders />,
                            },
                            {
                                path: 'pending-payment',
                                element: <AdminOrders />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

function App() {
    const { token, login, logout, userId, userEmail, isAdmin } = useAuth();

    return (
        <>
            <AlertProvider
                template={AlertTemplate}
                {...{
                    position: positions.BOTTOM_RIGHT,
                    timeout: 5000,
                    offset: '30px',
                    transition: transitions.SCALE,
                }}
            >
                <AuthContext.Provider
                    value={{
                        isLoggedIn: !!token,
                        token: token,
                        userId: userId,
                        userEmail: userEmail,
                        isAdmin: isAdmin,
                        login: login,
                        logout: logout,
                    }}
                >
                    <CartProviderContext>
                        <RouterProvider router={router} />
                    </CartProviderContext>
                </AuthContext.Provider>
                <SpeedInsights />
            </AlertProvider>
        </>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <App />
        </Suspense>
    );
}
