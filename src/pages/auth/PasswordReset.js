import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';

import { useFormik } from 'formik';
import SubmitButton from '../../shared/components/FormElements/SubmitButton';
import { useAlert } from '../../shared/components/Alert/react-alert';

const PasswordReset = () => {
    const { t } = useTranslation();
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();

    const resetPasswordToken = useParams().resetPasswordToken;

    const formik = useFormik({
        initialValues: {
            token: resetPasswordToken,
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required(t('fields.passwordErrorText')),
        }),
        onSubmit: (values) => {
            setSending(true);

            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/api/users/reset-password`, values, {
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                })
                .then((response) => {
                    navigate('/user/password-reset-successfully');
                })
                .catch((error) => {
                    setSending(false);
                    navigate('/user/password-reset-error'); // TO DO: mirar la lógica de esto

                    if (error?.code === 422) {
                        alert.show(t('system.invalidInputs'));
                    } else if (error?.code === 404) {
                        alert.show('User not found');
                    } else if (error?.code === 500) {
                        alert.show(t('system.failResetPassword'));
                    } else if (error?.code === 401) {
                        alert.show(t('system.unauthorized'));
                    } else if (error?.code === 403) {
                        alert.show(t('system.authenticationFailed'));
                    } else if (error?.code) {
                        alert.show(error.code + ' - ' + error.message);
                    } else {
                        alert.show(t('system.somethingWentWrong'));
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
                <div className="row align-items-center min-vh-100">
                    <div className="col-md-6 col-lg-4 col-xl-3 mx-auto">
                        <div className="card">
                            <div className="card-body py-5 px-sm-5">
                                <div className="mb-5 text-center">
                                    <h6 className="h3 mb-1">{t('navigation.resetPassword')}</h6>
                                </div>
                                <span className="clearfix"></span>
                                <form className="form-validate" onSubmit={formik.handleSubmit}>
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
                                        <SubmitButton
                                            type="submit"
                                            title={t('navigation.resetPassword')}
                                            loading={sending}
                                        />
                                    </div>
                                </form>
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

export default PasswordReset;
