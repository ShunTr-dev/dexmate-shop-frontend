import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import { useAlert } from '../../../shared/components/Alert/react-alert';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';

const AdminProductGenerateWithAI = () => {
    const { t } = useTranslation();
    const [sending, setSending] = useState(false);
    const [errorNetlify, setErrorNetlify] = useState(false);

    const navigate = useNavigate();
    const alert = useAlert();
    const auth = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required(t('fields.typeTheProductName')),
        }),
        onSubmit: (values) => {
            setSending(true);
            //console.log('Enviando petición a la API - Add Product Wizard');
            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/api/products/add-product-wizard/`, values)
                .then((response) => {
                    setSending(false);
                    if (auth.isAdmin) {
                        navigate('/admin/products/edit/' + response.data.productId);
                    } else {
                        navigate('/products/' + response.data.productId);
                    }
                })
                .catch((error) => {
                    setSending(false);

                    if (error?.code === 404) {
                        alert.show(t('system.somethingWentWrong'));
                    } else if (error?.code === 401) {
                        alert.show('User exists already, please login instead');
                    } else if (error?.code === 403) {
                        alert.show(t('system.authenticationFailed'));
                    } else if (error?.code) {
                        alert.show(error.message);
                    } else {
                        // TO DO: Mirar el error "Canceling last request."
                        console.log(error);
                        // alert.show(t('system.somethingWentWrong'))
                        if (error === 'Network Error') {
                            setErrorNetlify(true);
                        }
                    }
                });
        },
    });

    return (
        <ContainerWrapper title={t('products.generateProductWithAI')}>
            <div className="search mt-10 mb-8">
                <form id="form-checkout" className="form-validate" onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''} `}
                                    name="title"
                                    placeholder={t('fields.typeNameForYourProductPlaceholder')}
                                    {...formik.getFieldProps('title')}
                                    value={formik.values.title}
                                />

                                <button className="btn btn-light" id="update">
                                    {t('system.submit')}{' '}
                                    {sending && (
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                            style={{ marginRight: '5px' }}
                                        >
                                            {' '}
                                        </span>
                                    )}
                                </button>
                            </div>
                            {formik.touched.title && formik.errors.title ? (
                                <div className="is-invalid">{formik.errors.title}</div>
                            ) : null}

                            {errorNetlify && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {t('cart.cartAlertCreditCard')}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </ContainerWrapper>
    );
};

export default AdminProductGenerateWithAI;
