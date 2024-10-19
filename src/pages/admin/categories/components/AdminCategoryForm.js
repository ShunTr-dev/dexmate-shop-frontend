import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import axiosInterceptor from '../../../../shared/util/axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Card from '../../../../shared/components/UIElements/Card';
import SubmitButton from '../../../../shared/components/FormElements/SubmitButton';
import ContainerWrapper from '../../../../shared/components/UIElements/ContainerWrapper';

const AdminCategoryForm = (props) => {
    const { t } = useTranslation();
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();
    let newImagesArr = [];

    const [images, setImages] = useState(props.actualImages);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const translateWithDeepl = (formikInputValue, formikInputToUpdate, languageToTranslate) => {
        let languageFrom = '';
        let languageTo = 'en-GB';

        if (languageToTranslate === 'es') {
            languageFrom = 'en';
            languageTo = 'es';
        } else if (languageToTranslate === 'en') {
            languageFrom = 'es';
            languageTo = 'en-GB';
        }

        const values = {
            textToTranslate: formikInputValue,
            languageFrom: languageFrom,
            languageTo: languageTo,
        };

        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/translations`, values)
            .then((response) => {
                if (response.data) {
                    //console.log('Haciendo petición a la API - Deepl Translate');
                    formik.setFieldValue(formikInputToUpdate, response.data.translatedText);
                }
            })
            .catch((error) => {
                //console.log(error);
            });
    };

    const imagesDeleteHandler = (event) => {
        event.preventDefault();
        const imagePath = event.target.src.split(process.env.REACT_APP_AWS_S3_URL_BASE).pop();

        let imagesToDeleteArr = imagesToDelete;
        imagesToDeleteArr.push(imagePath);

        setImagesToDelete(imagesToDeleteArr);
        setImages(images.filter((image) => image !== imagePath));
    };

    const formik = useFormik({
        initialValues: {
            id: props.id,
            newImages: [],
            nameEs: props.nameEs,
            nameEn: props.nameEn,
        },
        validationSchema: Yup.object({
            //TO DO traduccion
            nameEs: Yup.string().required(t('fields.nameErrorText')),
            nameEn: Yup.string().required(t('fields.nameErrorText')),
        }),
        onSubmit: (values) => {
            setSending(true);
            values.imagesToDelete = imagesToDelete;

            axios.post(props.url, values, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
                setSending(false);
                navigate('/admin/categories/list');
            });
        },
    });

    return (
        <>
            <ContainerWrapper title={props.title}>
                <div className="col-12">
                    <Card>
                        <form
                            id="form-checkout"
                            className="form-validate"
                            encType="multipart/form-data"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="row">
                                {images &&
                                    images.map((image) => {
                                        return (
                                            <div
                                                className="col-md-3"
                                                key={process.env.REACT_APP_AWS_S3_URL_BASE + image}
                                            >
                                                <div className="product">
                                                    <div className="product-image">
                                                        <img
                                                            loading="lazy"
                                                            alt="Product"
                                                            width="380"
                                                            height="507"
                                                            src={process.env.REACT_APP_AWS_S3_URL_BASE + image}
                                                            onClick={imagesDeleteHandler}
                                                        />
                                                        <span className="product-wishlist">
                                                            <a href="javascript: void(0)">
                                                                <i className="fa fa-trash"></i>
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Example file input</label>
                                <input
                                    type="file"
                                    name="newImages"
                                    className="form-control-file"
                                    id="exampleFormControlFile1"
                                    accept="image/*"
                                    onChange={(e) => {
                                        newImagesArr.push(e.currentTarget.files[0]);
                                        formik.setFieldValue('newImages', newImagesArr);
                                    }}
                                />
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="nameEs">
                                        {t('fields.title')} - {t('system.spanish')}
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.nameEs && formik.errors.nameEs ? 'is-invalid' : ''} `}
                                            name="nameEs"
                                            placeholder={t('fields.namePlaceholderCategory')}
                                            {...formik.getFieldProps('nameEs')}
                                            value={formik.values.nameEs}
                                        />
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            id="update"
                                            onClick={(event) =>
                                                translateWithDeepl(formik.values.nameEs, 'nameEn', 'en')
                                            }
                                        >
                                            {t('system.translateEnglish')}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="nameEn">
                                        {t('fields.title')} - {t('system.english')}
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.nameEn && formik.errors.nameEn ? 'is-invalid' : ''} `}
                                            name="nameEn"
                                            placeholder={t('fields.namePlaceholderCategory')}
                                            {...formik.getFieldProps('nameEn')}
                                            value={formik.values.nameEn}
                                        />
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            id="update"
                                            onClick={(event) =>
                                                translateWithDeepl(formik.values.nameEn, 'nameEs', 'es')
                                            }
                                        >
                                            {t('system.translateSpanish')}
                                        </button>
                                    </div>
                                    {formik.touched.nameEn && formik.errors.nameEn ? (
                                        <div className="is-invalid">{formik.errors.nameEn}</div>
                                    ) : null}
                                </div>
                            </div>

                            <SubmitButton type="submit" title={t('system.submit')} loading={sending} />
                        </form>
                    </Card>
                </div>
            </ContainerWrapper>
        </>
    );
};

export default AdminCategoryForm;
