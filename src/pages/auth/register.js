import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import SubmitButton from '../../shared/components/FormElements/SubmitButton';
import { AuthContext } from '../../shared/context/auth-context';
import { useAlert } from '../../shared/components/Alert/react-alert';

const Register = () => {
    const { t } = useTranslation();
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();

    const auth = useContext(AuthContext);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            reminders: false,
            terms_conditions: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t('fields.emailErrorText')).required(t('fields.emailErrorText')),
            password: Yup.string().required(t('fields.passwordErrorText')),
            terms_conditions: Yup.bool().oneOf([true], t('fields.termsConditionsErrorText')),
        }),
        onSubmit: (values) => {
            setSending(true);

            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/api/users/register`, values, {
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                })
                .then((response) => {
                    auth.login(
                        response.data.userId,
                        response.data.email,
                        response.data.cart,
                        response.data.isAdmin,
                        response.data.token
                    );
                    setSending(false);
                    navigate('/'); // Redirigimos al usuario a la página de inicio
                })
                .catch((error) => {
                    setSending(false);

                    if (error?.code === 409) {
                        alert.show(t('system.userAlreadyExists'));
                    } else if (error?.code === 404) {
                        alert.show(t('system.noUserFoundWithThisEmail'));
                    } else if (error?.code === 422) {
                        alert.show(t('system.invalidInputs'));
                    } else if (error?.code === 500) {
                        alert.show(t('system.registerFailed'));
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
                        <div className="card shadow-lg">
                            <div className="card-body py-5 px-sm-5">
                                <h3>{t('navigation.register')}</h3>
                                <form id="form1" className="form-validate mt-5" onSubmit={formik.handleSubmit}>
                                    <div className="row">
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
                                    </div>

                                    <div className="form-check mb-1 mt-5">
                                        <input
                                            type="checkbox"
                                            name="reminders"
                                            id="reminders"
                                            className="form-check-input"
                                            {...formik.getFieldProps('reminders')}
                                            value={formik.values.reminders}
                                        />
                                        <label className="form-check-label" htmlFor="reminders">
                                            {t('misc.sendOcasionalReminders')}
                                        </label>

                                        {formik.touched.reminders && formik.errors.reminders ? (
                                            <div className="is-invalid">{formik.errors.reminders}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="terms_conditions"
                                            id="terms_conditions"
                                            className={`form-check-input 
												${formik.touched.terms_conditions && formik.errors.terms_conditions ? 'is-invalid' : ''}`}
                                            {...formik.getFieldProps('terms_conditions')}
                                            value={formik.values.terms_conditions}
                                        />
                                        <label className="form-check-label" htmlFor="terms_conditions">
                                            {t('misc.byChecking')}{' '}
                                            <Link to="/terms-of-service">{t('navigation.termsAndConditions')}</Link>.
                                        </label>

                                        {formik.touched.terms_conditions && formik.errors.terms_conditions ? (
                                            <div className="is-invalid">{formik.errors.terms_conditions}</div>
                                        ) : null}
                                    </div>
                                    <SubmitButton type="submit" title={t('system.submit')} loading={sending} />
                                </form>
                                <div className="mt-4 text-center">
                                    <Link to="/login" className="small fw-bold">
                                        {t('navigation.login')}
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

export default Register;
