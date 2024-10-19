//import PageHeader from "../../../../shared/components/UIElements/PageHeader";
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

const AdminProductForm = (props) => {
    const { t, i18n } = useTranslation();
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
                    //console.log(response.data);
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
            titleEs: props.titleEs,
            titleEn: props.titleEn,
            price: props.price,
            shortDescriptionEs: props.shortDescriptionEs,
            shortDescriptionEn: props.shortDescriptionEn,
            largeDescriptionEs: props.largeDescriptionEs,
            largeDescriptionEn: props.largeDescriptionEn,
            visible: props.visible,
            SKU: props.SKU,
            stock: props.stock,
            weight: props.weight,
            dimensions: props.dimensions,
            categories: props.categories,
        },
        validationSchema: Yup.object({
            //TO DO traduccion
            categories: Yup.array().min(1).required(t('fields.categoryErrorText')),
            titleEs: Yup.string().required(t('fields.titleErrorText')),
            titleEn: Yup.string().required(t('fields.titleErrorText')),
            price: Yup.string().required(t('fields.priceErrorText')),
            shortDescriptionEs: Yup.string().required(t('fields.shortDescriptionErrorText')),
            shortDescriptionEn: Yup.string().required(t('fields.shortDescriptionErrorText')),
            largeDescriptionEs: Yup.string().required(t('fields.largeDescriptionErrorText')),
            largeDescriptionEn: Yup.string().required(t('fields.largeDescriptionErrorText')),
        }),
        onSubmit: (values) => {
            setSending(true);
            values.imagesToDelete = imagesToDelete;

            axios.post(props.url, values, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
                setSending(false);
                navigate('/admin/products/list');
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
                                <div className="form-group col-md-12">
                                    <label htmlFor="SKU">{t('fields.SKU')}</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.SKU && formik.errors.SKU ? 'is-invalid' : ''} `}
                                        name="SKU"
                                        placeholder={t('fields.SKUPlaceholder')}
                                        {...formik.getFieldProps('SKU')}
                                        value={formik.values.SKU}
                                    />
                                    {formik.touched.SKU && formik.errors.SKU ? (
                                        <div className="is-invalid">{formik.errors.SKU}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="titleEs">
                                        {t('fields.title')} - {t('system.spanish')}
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.titleEs && formik.errors.titleEs ? 'is-invalid' : ''} `}
                                            name="titleEs"
                                            placeholder={t('fields.titleEsPlaceholder')}
                                            {...formik.getFieldProps('titleEs')}
                                            value={formik.values.titleEs}
                                            language="es"
                                        />
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            id="update"
                                            onClick={(event) =>
                                                translateWithDeepl(formik.values.titleEs, 'titleEn', 'en')
                                            }
                                        >
                                            {t('system.translateEnglish')}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="titleEn">
                                        {t('fields.title')} - {t('system.english')}
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.titleEn && formik.errors.titleEn ? 'is-invalid' : ''} `}
                                            name="titleEn"
                                            placeholder={t('fields.titleEnPlaceholder')}
                                            {...formik.getFieldProps('titleEn')}
                                            value={formik.values.titleEn}
                                        />
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            id="update"
                                            onClick={(event) =>
                                                translateWithDeepl(formik.values.titleEn, 'titleEs', 'es')
                                            }
                                        >
                                            {t('system.translateSpanish')}
                                        </button>
                                    </div>
                                    {formik.touched.titleEn && formik.errors.titleEn ? (
                                        <div className="is-invalid">{formik.errors.titleEn}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="shortDescriptionEs">
                                        {t('fields.shortDescription')} - {t('system.spanish')}
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className={`form-control 
												${formik.touched.shortDescriptionEs && formik.errors.shortDescriptionEs ? 'is-invalid' : ''} `}
                                            name="shortDescriptionEs"
                                            placeholder={t('fields.shortDescriptionEsPlaceholder')}
                                            {...formik.getFieldProps('shortDescriptionEs')}
                                            value={formik.values.shortDescriptionEs}
                                        />
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            id="update"
                                            onClick={(event) =>
                                                translateWithDeepl(
                                                    formik.values.shortDescriptionEs,
                                                    'shortDescriptionEn',
                                                    'en'
                                                )
                                            }
                                        >
                                            {t('system.translateEnglish')}
                                        </button>
                                    </div>
                                    {formik.touched.shortDescriptionEs && formik.errors.shortDescriptionEs ? (
                                        <div className="is-invalid">{formik.errors.shortDescriptionEs}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="shortDescriptionEn">
                                        {t('fields.shortDescription')} - {t('system.english')}
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className={`form-control 
												${formik.touched.shortDescriptionEn && formik.errors.shortDescriptionEn ? 'is-invalid' : ''} `}
                                            name="shortDescriptionEn"
                                            placeholder={t('fields.shortDescriptionEnPlaceholder')}
                                            {...formik.getFieldProps('shortDescriptionEn')}
                                            value={formik.values.shortDescriptionEn}
                                        />
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            id="update"
                                            onClick={(event) =>
                                                translateWithDeepl(
                                                    formik.values.shortDescriptionEn,
                                                    'shortDescriptionEs',
                                                    'es'
                                                )
                                            }
                                        >
                                            {t('system.translateSpanish')}
                                        </button>
                                    </div>
                                    {formik.touched.shortDescriptionEn && formik.errors.shortDescriptionEn ? (
                                        <div className="is-invalid">{formik.errors.shortDescriptionEn}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="largeDescriptionEs">
                                        {t('fields.largeDescription')} - {t('system.spanish')}
                                    </label>
                                    <div className="input-group mb-3">
                                        <textarea
                                            type="text"
                                            className={`form-control 
												${formik.touched.largeDescriptionEs && formik.errors.largeDescriptionEs ? 'is-invalid' : ''} `}
                                            name="largeDescriptionEs"
                                            placeholder={t('fields.largeDescriptionEsPlaceholder')}
                                            {...formik.getFieldProps('largeDescriptionEs')}
                                            value={formik.values.largeDescriptionEs}
                                        />
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            id="update"
                                            onClick={(event) =>
                                                translateWithDeepl(
                                                    formik.values.largeDescriptionEs,
                                                    'largeDescriptionEn',
                                                    'en'
                                                )
                                            }
                                        >
                                            {t('system.translateEnglish')}
                                        </button>
                                    </div>
                                    {formik.touched.largeDescriptionEs && formik.errors.largeDescriptionEs ? (
                                        <div className="is-invalid">{formik.errors.largeDescriptionEs}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="largeDescriptionEn">
                                        {t('fields.largeDescription')} - {t('system.english')}
                                    </label>
                                    <div className="input-group mb-3">
                                        <textarea
                                            type="text"
                                            className={`form-control 
												${formik.touched.largeDescriptionEn && formik.errors.largeDescriptionEn ? 'is-invalid' : ''} `}
                                            name="largeDescriptionEn"
                                            placeholder={t('fields.largeDescriptionEnPlaceholder')}
                                            {...formik.getFieldProps('largeDescriptionEn')}
                                            value={formik.values.largeDescriptionEn}
                                        />
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            id="update"
                                            onClick={(event) =>
                                                translateWithDeepl(
                                                    formik.values.largeDescriptionEn,
                                                    'largeDescriptionEs',
                                                    'es'
                                                )
                                            }
                                        >
                                            {t('system.translateSpanish')}
                                        </button>
                                    </div>
                                    {formik.touched.largeDescriptionEn && formik.errors.largeDescriptionEn ? (
                                        <div className="is-invalid">{formik.errors.largeDescriptionEn}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="weight">{t('fields.categories')}</label>
                                    <div className="row">
                                        {props.categoriesList.map((category, index) => {
                                            return (
                                                <div className="col-md-2" key={category.id}>
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            name={`categories.${category.id}`}
                                                            id={category.id}
                                                            className={`form-check-input 
																${formik.touched.categories && formik.errors.categories ? 'is-invalid' : ''}`}
                                                            {...formik.getFieldProps('categories')}
                                                            value={category.id}
                                                            checked={formik.values.categories.includes(category.id)}
                                                        />
                                                        <label className="form-check-label" htmlFor={category.id}>
                                                            {category.name[0][i18n.resolvedLanguage]}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {formik.errors.categories ? (
                                    <div className="is-invalid">{formik.errors.categories}</div>
                                ) : null}
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="price">
                                        {t('fields.price')} - ({process.env.REACT_APP_CURRENCY})
                                    </label>
                                    <input
                                        className={`form-control ${formik.touched.price && formik.errors.price ? 'is-invalid' : ''} `}
                                        type="text"
                                        name="price"
                                        placeholder={t('fields.pricePlaceholder')}
                                        {...formik.getFieldProps('price')}
                                        value={formik.values.price}
                                    />
                                    {formik.touched.price && formik.errors.price ? (
                                        <div className="is-invalid">{formik.errors.price}</div>
                                    ) : null}
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="stock">{t('fields.stock')}</label>
                                    <input
                                        type="stock"
                                        className={`form-control ${formik.touched.stock && formik.errors.stock ? 'is-invalid' : ''} `}
                                        name="stock"
                                        placeholder={t('fields.stockPlaceholder')}
                                        {...formik.getFieldProps('stock')}
                                        value={formik.values.stock}
                                    />
                                    {formik.touched.stock && formik.errors.stock ? (
                                        <div className="is-invalid">{formik.errors.stock}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="weight">{t('fields.weight')}</label>
                                    <input
                                        className={`form-control ${formik.touched.weight && formik.errors.weight ? 'is-invalid' : ''} `}
                                        type="text"
                                        name="weight"
                                        placeholder={t('fields.weightPlaceholder')}
                                        {...formik.getFieldProps('weight')}
                                        value={formik.values.weight}
                                    />
                                    {formik.touched.weight && formik.errors.weight ? (
                                        <div>{formik.errors.weight}</div>
                                    ) : null}
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="dimensions">{t('fields.dimensions')}</label>
                                    <input
                                        type="dimensions"
                                        className={`form-control ${formik.touched.dimensions && formik.errors.dimensions ? 'is-invalid' : ''} `}
                                        name="dimensions"
                                        placeholder={t('fields.dimensionsPlaceholder')}
                                        {...formik.getFieldProps('dimensions')}
                                        value={formik.values.dimensions}
                                    />
                                    {formik.touched.dimensions && formik.errors.dimensions ? (
                                        <div className="is-invalid">{formik.errors.dimensions}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="form-check mb-3 mt-1">
                                <input
                                    type="checkbox"
                                    name="visible"
                                    id="visible"
                                    className="form-check-input"
                                    {...formik.getFieldProps('visible')}
                                    checked={formik.values.visible}
                                    value={formik.values.visible}
                                />
                                <label className="form-check-label" htmlFor="visible">
                                    {t('fields.visible')}
                                </label>

                                {formik.touched.visible && formik.errors.visible ? (
                                    <div className="is-invalid">{formik.errors.visible}</div>
                                ) : null}
                            </div>

                            <SubmitButton type="submit" title={t('system.submit')} loading={sending} />
                        </form>
                    </Card>
                </div>
            </ContainerWrapper>
        </>
    );
};

export default AdminProductForm;
