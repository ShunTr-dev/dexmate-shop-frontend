import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CookieNotify = () => {
    const { t } = useTranslation();

    const [cookiesConsent, setCookiesConsent] = useState(false);

    const acceptCookiesHandler = () => {
        localStorage.setItem('acceptedCookies', true);
        setCookiesConsent(true);
    };

    const denyCookiesHandler = () => {
        localStorage.setItem('acceptedCookies', false);
        setCookiesConsent(true);
    };

    return (
        <>
            {!cookiesConsent && (
                <div
                    className="modal-strip cookie-notify background-dark"
                    data-delay="3000"
                    data-expire="1"
                    data-cookie-name="cookiebar2021_1"
                    data-cookie-enabled="true"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 text-sm-center sm-center sm-m-b-10 m-t-5">
                                {t('system.thisWebsiteUsesCookies')}.{' '}
                                <Link to="/legal/cookies" className="text-light">
                                    <span>
                                        {' '}
                                        {t('navigation.cookiePolicy')} <i className="fa fa-info-circle"></i>
                                    </span>
                                </Link>
                            </div>
                            <div className="col-lg-4 text-end sm-text-center sm-center">
                                <button
                                    type="button"
                                    onClick={denyCookiesHandler}
                                    className="btn btn-roundeded btn-light btn-outline btn-sm m-r-10 modal-close"
                                >
                                    {t('system.decline')}
                                </button>
                                <button
                                    type="button"
                                    onClick={acceptCookiesHandler}
                                    className="btn btn-roundeded btn-light btn-sm modal-confirm"
                                >
                                    {t('system.gotIt')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CookieNotify;
