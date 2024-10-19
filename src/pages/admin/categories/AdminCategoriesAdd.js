import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import { useState } from 'react';

const AdminCategoriesAdd = () => {
    const { t } = useTranslation();
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('fields.nameErrorText')),
        }),
        onSubmit: (values) => {
            setSending(true);
            //console.log('Enviando petición a la API - Add category');
            axios
                .post(`${process.env.REACT_APP_API_BASE_URL}/api/categories/admin/add-category/`, values)
                .then((response) => {
                    setSending(false);
                    navigate('/admin/categories/edit/' + response.data.categoryId);
                });
        },
    });

    return (
        <ContainerWrapper title={t('misc.addCategory')}>
            <div className="search mt-10 mb-8">
                <form id="form-checkout" className="form-validate" onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''} `}
                                    name="name"
                                    placeholder={t('fields.namePlaceholderCategory')}
                                    {...formik.getFieldProps('name')}
                                    value={formik.values.name}
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
                            {formik.touched.name && formik.errors.name ? (
                                <div className="is-invalid">{formik.errors.name}</div>
                            ) : null}
                        </div>
                    </div>
                </form>
            </div>
        </ContainerWrapper>
    );
};

export default AdminCategoriesAdd;
