import React from 'react';
import StarRating from '../../../shared/components/UIElements/StarRating.js';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProductsListElement = (props) => {
    const { t, i18n } = useTranslation();

    const timeStart = new Date(props.createdAt);
    const timeEnd = new Date();
    const daysOnSale = Math.ceil((timeEnd.getTime() - timeStart.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="col-lg-3" key={props.id}>
            <div className="product">
                <div className="product-image">
                    {props.images.map((image) => (
                        <Link to={`/products/${props.id}`} key={process.env.REACT_APP_AWS_S3_URL_BASE + image}>
                            <img
                                loading="lazy"
                                alt={props.title[0][i18n.resolvedLanguage]}
                                width="380"
                                height="507"
                                src={process.env.REACT_APP_AWS_S3_URL_BASE + image}
                            />
                        </Link>
                    ))}
                    {daysOnSale < 5 && <span className="product-new">{t('products.new')}</span>}
                    {props.isHot && <span className="product-hot">{t('products.hot')}</span>}
                </div>

                <div className="product-description">
                    <div className="product-category">
                        {props.category.length > 0 && props.category[0]['name'][0][i18n.resolvedLanguage]}
                    </div>
                    <div className="product-title">
                        <h3>
                            <Link to={`/products/${props.id}`}>{props.title[0][i18n.resolvedLanguage]}</Link>
                        </h3>
                    </div>
                    <div className="product-price">
                        <ins>
                            {props.price} {process.env.REACT_APP_CURRENCY}
                        </ins>
                    </div>

                    {props.reviews > 0 && (
                        <>
                            <StarRating rating={props.rating} />
                            <div className="product-reviews">
                                <Link to={`/products/${props.id}`}>
                                    {props.reviews} {t('products.customerReviews')}
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsListElement;