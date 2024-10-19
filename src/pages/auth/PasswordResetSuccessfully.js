import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PasswordResetSuccessfully = () => {
    const { t } = useTranslation();

    return (
        <section
            className="pt-5 pb-5"
            style={{ backgroundImage: `url("https://dexmate-shop.s3.eu-west-3.amazonaws.com/login-background.webp")` }}
        >
            <div className="container-fluid d-flex flex-column">
                <div className="row align-items-center min-vh-100">
                    <div className="col-md-6 col-lg-4 col-xl-3 mx-auto">
                        <div className="card">
                            <div className="card-body py-5 px-sm-5">
                                <div className="mb-5 text-center">
                                    <h6 className="h3 mb-1">{t('system.passwordResetSuccess')}</h6>
                                </div>
                                <span className="clearfix"></span>

                                <div className="mt-4 text-center">
                                    <Link to="/register" className="small fw-bold">
                                        {t('navigation.createAccount')}
                                    </Link>{' '}
                                    -{' '}
                                    <Link to="/login" className="small fw-bold">
                                        {t('navigation.login')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PasswordResetSuccessfully;
