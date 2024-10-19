import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';

import { AuthContext } from '../../shared/context/auth-context';
import { useFormik } from 'formik';
import SubmitButton from '../../shared/components/FormElements/SubmitButton';
import CartContext from '../../shared/context/cart-context';
import { useAlert } from '../../shared/components/Alert/react-alert';

const Login = () => {
    const { t } = useTranslation();
    const auth = useContext(AuthContext);
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const alert = useAlert();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            reminders: '1',
            terms_conditions: '1',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t('fields.emailErrorText')).required(t('fields.emailErrorText')),
            password: Yup.string().required(t('fields.passwordErrorText')),
        }),
        onSubmit: (values) => {
            setSending(true);
            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, values, {
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                })
                .then((response) => {
                    setSending(false);
                    auth.login(
                        response.data.userId,
                        response.data.email,
                        response.data.cart,
                        response.data.isAdmin,
                        response.data.token
                    );
                    cartCtx.reloadCart();
                    navigate('/');
                })
                .catch((error) => {
                    setSending(false);

                    if (error?.code === 403) {
                        alert.show(t('system.invalidCredentials'));
                    } else if (error?.code === 404) {
                        alert.show(t('system.invalidCredentials'));
                    } else if (error?.code === 422) {
                        alert.show(t('system.invalidInputs'));
                    } else if (error?.code === 500) {
                        alert.show(t('system.loggingInFailed'));
                    } else if (error?.code === 401) {
                        alert.show(t('system.unauthorized'));
                    } else if (error?.code) {
                        alert.show(error.code + ' - ' + error.message);
                    } else {
                        alert.show('Something bad happened!');
                    }
                });
        },
    });

    return (
        <section
            className="pt-5 pb-5"
            style={{ backgroundImage: `url("https://dexmate-shop.s3.eu-west-3.amazonaws.com/login-background.webp")` }}
        >
            <div className="container-fluid d-flex flex-column">
                <div className="row align-items-center min-vh-50">
                    <div className="col-md-6 col-lg-4 col-xl-3 mx-auto">
                        <div className="card">
                            <div className="card-body py-5 px-sm-5">
                                <div className="mb-5 text-center">
                                    <h6 className="h3 mb-1">{t('navigation.login')}</h6>
                                </div>
                                <span className="clearfix"></span>
                                <form className="form-validate" onSubmit={formik.handleSubmit}>
                                    <div className={`form-group col-md-12`}>
                                        <label htmlFor="email">{t('fields.email')}</label>
                                        <input
                                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''} `}
                                            id="email"
                                            type="email"
                                            placeholder={t('fields.emailPlaceholder')}
                                            required
                                            {...formik.getFieldProps('email')}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="is-invalid">{formik.errors.email}.</div>
                                        ) : null}
                                    </div>

                                    <div className={`form-group col-md-12`}>
                                        <label htmlFor="password">{t('fields.password')}</label>
                                        <input
                                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''} `}
                                            id="password"
                                            type="password"
                                            placeholder={t('fields.passwordPlaceholder')}
                                            required
                                            {...formik.getFieldProps('password')}
                                            value={formik.values.password}
                                        />

                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="is-invalid">{formik.errors.password}.</div>
                                        ) : null}
                                    </div>
                                    <div className="mt-4">
                                        <SubmitButton type="submit" title={t('navigation.login')} loading={sending} />
                                    </div>
                                </form>
                                <div className="mt-4 text-center">
                                    <Link to="/register" className="small fw-bold">
                                        {t('navigation.createAccount')}
                                    </Link>{' '}
                                    -{' '}
                                    <Link to="/user/password-reset-email" className="small fw-bold">
                                        {t('navigation.resetPassword')}
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

export default Login;
