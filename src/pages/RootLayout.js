import Footer from '../shared/components/Navigation/Footer';
import HeaderMain from '../shared/components/Navigation/HeaderMain';

import { Outlet, ScrollRestoration } from 'react-router-dom';
import CookieNotify from './legal/components/CookieNotify';

const RootLayout = () => {
    return (
        <>
            <ScrollRestoration />
            <HeaderMain />
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
            {localStorage.getItem('acceptedCookies') === null && <CookieNotify />}

            <Footer />
        </>
    );
};

export default RootLayout;
