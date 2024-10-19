import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';

import { useFormik } from 'formik';
import SubmitButton from '../../shared/components/FormElements/SubmitButton';
import { useAlert } from '../../shared/components/Alert/react-alert';

const PasswordResetSendEmail = () => {
    const { t } = useTranslation();
    const [sending, setSending] = useState(false);
    const alert = useAlert();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t('fields.emailErrorText')).required(t('fields.emailErrorText')),
        }),
        onSubmit: (values) => {
            setSending(true);
            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/api/users/send-reset-email`, values, {
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                })
                .then((response) => {
                    setSending(false);
                    alert(t('system.resetEmailSuccess'));
                })
                .catch((error) => {
                    setSending(false);

                    if (error?.code === 409 || error?.code === 404 || error?.code === 500) {
                        alert.show(t('system.noUserFoundWithThisEmail'));
                    } else if (error?.code === 422) {
                        alert.show(t('system.invalidInputs'));
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

export default PasswordResetSendEmail;
