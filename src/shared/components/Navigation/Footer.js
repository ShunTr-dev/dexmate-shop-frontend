import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer id="footer">
            <div className="footer-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="widget">
                                <div className="widget-title">{process.env.REACT_APP_SHOP_NAME}</div>
                                <p className="mb-5">Santiago de Compostela, 15703, España</p>
                                <a
                                    href="https://www.linkedin.com/in/pablo-martinez-developer/"
                                    className="btn btn-inverted"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('navigation.contact')}
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="widget">
                                        <div className="widget-title">{t('navigation.discover')}</div>
                                        <ul className="list">
                                            <li>
                                                <Link to="/features">{t('navigation.features')}</Link>
                                            </li>
                                            <li>
                                                <Link to="https://www.linkedin.com/in/pablo-martinez-developer/">
                                                    Linkedin
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="https://github.com/ShunTr-dev">Github</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="widget">
                                        <div className="widget-title">Pages</div>
                                        <ul className="list">
                                            <li>
                                                <Link to="/login">{t('navigation.login')}</Link>
                                            </li>
                                            <li>
                                                <Link to="/products">{t('navigation.shop')}</Link>
                                            </li>
                                            <li>
                                                <Link to="/legal/cookies">{t('navigation.cookies')}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="widget">
                                        <div className="widget-title">{t('navigation.support')}</div>
                                        <ul className="list">
                                            <li>
                                                <Link to="/products">{t('navigation.faq')}</Link>
                                            </li>
                                            <li>
                                                <Link to="/legal/terms-of-service">
                                                    {t('navigation.termsOfService')}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="https://www.linkedin.com/in/pablo-martinez-developer/">
                                                    {t('navigation.contactUs')}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-content">
                <div className="container">
                    <div className="copyright-text text-center">
                        <a
                            href="https://www.linkedin.com/in/pablo-mart%C3%ADnez-developer/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            &copy; {new Date().getFullYear()} Pablo Martínez. {t('navigation.alRightsReserved')}.
                        </a>{' '}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
