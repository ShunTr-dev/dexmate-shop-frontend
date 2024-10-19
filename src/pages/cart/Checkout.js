import DeliveryInfo from '../../shared/components/UIElements/DeliveryInfo';
import PageHeader from '../../shared/components/UIElements/PageHeader';
import OrderOverview from './components/OrderOverview';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../shared/context/cart-context';
import Card from '../../shared/components/UIElements/Card';
import SubmitButton from '../../shared/components/FormElements/SubmitButton';

const Checkout = () => {
    const { t } = useTranslation();
    const cartCtx = useContext(CartContext);
    const [sending, setSending] = useState(false);
    const totalPriceWithOutVAT = (cartCtx.totalPrice / (1 + process.env.REACT_APP_VAT_PERCENTAGE / 100)).toFixed(2);
    const priceVAT = (cartCtx.totalPrice - +totalPriceWithOutVAT).toFixed(2);

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            telephone: '',
            email: '',
            address: '',
            address2: '',
            city: '',
            zip: '',
            country: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('fields.nameErrorText')),
            surname: Yup.string().required(t('fields.surnameErrorText')),
            telephone: Yup.string().required(t('fields.phoneErrorText')),
            email: Yup.string().email(t('fields.emailErrorText')).required(t('fields.emailErrorText')),
            address: Yup.string().required(t('fields.addressErrorText')),
            address2: Yup.string().required(t('fields.addressErrorText')),
            city: Yup.string().required(t('fields.cityErrorText')),
            zip: Yup.string().required(t('fields.zipCodeErrorText')),
            country: Yup.string().required(t('fields.countryErrorText')),
        }),
        onSubmit: (values) => {
            setSending(true);
            values.cart = cartCtx.products;
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/carts/checkout`, values).then((response) => {
                if (response.data.url) {
                    setSending(false);
                    window.location.replace(response.data.url);
                }
            });
        },
    });

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/users/mailing-data`)
            .then((response) => {
                if (response.data) {
                    //console.log('Haciendo petición a la API - User maling data');
                    formik.setFieldValue('name', response.data.name);
                    formik.setFieldValue('surname', response.data.surname);
                    formik.setFieldValue('telephone', response.data.phone);
                    formik.setFieldValue('email', response.data.email);
                    formik.setFieldValue('address', response.data.address);
                    formik.setFieldValue('address2', response.data.address2);
                    formik.setFieldValue('city', response.data.city);
                    formik.setFieldValue('zip', response.data.zip);
                    formik.setFieldValue('country', response.data.country);
                }
            })
            .catch((error) => {
                if (error?.code === 404 || error?.code === 500) {
                    alert.show('Something went wrong');
                } else if (error?.code === 401) {
                    alert.show('User exists already, please login instead');
                } else if (error?.code === 403) {
                    alert.show(t('system.authenticationFailed'));
                } else if (error?.code) {
                    alert.show(error.code + ' - ' + error.message);
                } else {
                    // TO DO: Mirar el error "Canceling last request."
                    //console.log(error);
                    // alert.show(t('system.somethingWentWrong'))
                }
            });
    }, []);

    return (
        <>
            <PageHeader title={t('cart.checkout')} description={t('cart.checkoutDetails')} />
            <section id="shop-checkout">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <Card>
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {t('cart.cartAlertCreditCard')}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <form id="form-checkout" className="form-validate" onSubmit={formik.handleSubmit}>
                                    <h4 className="mb-4">{t('cart.shippingDetails')}</h4>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="name">{t('fields.name')}</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''} `}
                                                name="name"
                                                placeholder={t('fields.namePlaceholder')}
                                                required
                                                {...formik.getFieldProps('name')}
                                                value={formik.values.name}
                                            />
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className="is-invalid">{formik.errors.name}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="surname">{t('fields.surname')}</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.surname && formik.errors.surname ? 'is-invalid' : ''} `}
                                                name="surname"
                                                placeholder={t('fields.surnamePlaceholder')}
                                                required
                                                {...formik.getFieldProps('surname')}
                                                value={formik.values.surname}
                                            />
                                            {formik.touched.surname && formik.errors.surname ? (
                                                <div className="is-invalid">{formik.errors.surname}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="telephone">{t('fields.phone')}</label>
                                            <input
                                                className={`form-control ${formik.touched.telephone && formik.errors.telephone ? 'is-invalid' : ''} `}
                                                type="tel"
                                                name="telephone"
                                                placeholder={t('fields.phonePlaceholder')}
                                                required
                                                {...formik.getFieldProps('telephone')}
                                                value={formik.values.telephone}
                                            />
                                            {formik.touched.telephone && formik.errors.telephone ? (
                                                <div>{formik.errors.telephone}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">{t('fields.email')}</label>
                                            <input
                                                type="email"
                                                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''} `}
                                                name="email"
                                                placeholder={t('fields.emailPlaceholder')}
                                                required
                                                {...formik.getFieldProps('email')}
                                                value={formik.values.email}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="is-invalid">{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-8">
                                            <label htmlFor="address">{t('fields.address')}</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''} `}
                                                name="address"
                                                placeholder={t('fields.addressPlaceholder')}
                                                required
                                                {...formik.getFieldProps('address')}
                                                value={formik.values.address}
                                            />
                                            {formik.touched.address && formik.errors.address ? (
                                                <div className="is-invalid">{formik.errors.address}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="address-2">{t('fields.aptSuite')}</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.address2 && formik.errors.address2 ? 'is-invalid' : ''} `}
                                                name="address2"
                                                placeholder={t('fields.aptSuitePlaceholder')}
                                                {...formik.getFieldProps('address2')}
                                                value={formik.values.address2}
                                            />
                                            {formik.touched.address2 && formik.errors.address2 ? (
                                                <div className="is-invalid">{formik.errors.address2}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="city">{t('fields.city')}</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''} `}
                                                name="city"
                                                placeholder={t('fields.cityPlaceholder')}
                                                required
                                                {...formik.getFieldProps('city')}
                                                value={formik.values.city}
                                            />
                                            {formik.touched.city && formik.errors.city ? (
                                                <div className="is-invalid">{formik.errors.city}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="zip">{t('fields.zipCode')}</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.zip && formik.errors.zip ? 'is-invalid' : ''} `}
                                                name="zip"
                                                placeholder={t('fields.zipCodePlaceholder')}
                                                required
                                                {...formik.getFieldProps('zip')}
                                                value={formik.values.zip}
                                            />
                                            {formik.touched.zip && formik.errors.zip ? (
                                                <div className="is-invalid">{formik.errors.zip}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="zip">{t('fields.country')}</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.country && formik.errors.country ? 'is-invalid' : ''} `}
                                                name="country"
                                                placeholder={t('fields.countryPlaceholder')}
                                                required
                                                {...formik.getFieldProps('country')}
                                                value={formik.values.country}
                                            />
                                            {formik.touched.country && formik.errors.country ? (
                                                <div className="is-invalid">{formik.errors.country}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <SubmitButton type="submit" title={t('cart.placeOrder')} loading={sending} />
                                </form>
                            </Card>

                            <OrderOverview />
                        </div>

                        <div className="col-md-4">
                            <Card>
                                <h2 className="h4 mb-0">{t('cart.orderSummary')}</h2>
                                <div className="media align-items-center mb-2">
                                    <div className="mr-3">
                                        <h4 className="h6 text-muted font-weight-normal mb-0">
                                            {t('cart.itemSubtotal')} ({cartCtx.totalElements})
                                        </h4>
                                    </div>
                                    <div className="media-body text-right">
                                        <span>
                                            {totalPriceWithOutVAT} {process.env.REACT_APP_CURRENCY}
                                        </span>
                                    </div>
                                </div>
                                <div className="media align-items-center mb-2">
                                    <div className="mr-3">
                                        <h4 className="h6 text-muted font-weight-normal mb-0">{t('cart.shipping')}</h4>
                                    </div>
                                    <div className="media-body text-right">
                                        <span>0 {process.env.REACT_APP_CURRENCY}</span>
                                    </div>
                                </div>
                                <div className="media align-items-center">
                                    <div className="mr-3">
                                        <h4 className="h6 text-muted font-weight-normal mb-0">
                                            {t('cart.tax')} ({+process.env.REACT_APP_VAT_PERCENTAGE}%)
                                        </h4>
                                    </div>
                                    <div className="media-body text-right">
                                        <span>
                                            {priceVAT} {process.env.REACT_APP_CURRENCY}
                                        </span>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="media align-items-center">
                                    <div className="mr-3">
                                        <h4 className="h4">{t('cart.total')}</h4>
                                    </div>
                                    <div className="media-body text-right">
                                        <span className="text-dark h4">
                                            {cartCtx.totalPrice} {process.env.REACT_APP_CURRENCY}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            <DeliveryInfo />
        </>
    );
};

export default Checkout;
