import React, { useState } from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Swiper from '../../../shared/components/UIElements/Swiper';
import StarRating from '../../../shared/components/UIElements/StarRating';
import CartContext from '../../../shared/context/cart-context';
import ProductReviews from './ProductReviews';

const ProductDetailItem = (props) => {
    const { t, i18n } = useTranslation();

    const cartCtx = useContext(CartContext);

    const [seeDescription, setSeeDescription] = useState(true);
    const [seeReviews, setSeeReviews] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const deductQuantityHandler = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addQuantityHandler = () => {
        setQuantity(quantity + 1);
    };

    const addToCartHandler = () => {
        cartCtx.addProductToCart({
            id: props.product.id,
            title: props.product.title,
            images: props.product.images,
            price: props.product.price,
            category: props.product.category,
            quantity: quantity,
        });
    };

    const seeDescriptionHandler = () => {
        setSeeDescription(true);
        setSeeReviews(false);
    };

    const seeReviewsHandler = () => {
        setSeeDescription(false);
        setSeeReviews(true);
    };

    return (
        <section id="product-page" className="product-page p-b-0">
            <div className="container">
                <div className="product">
                    <div className="row m-b-40">
                        <div className="col-lg-5">
                            <div className="product-image">
                                <Swiper images={props.product.images} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="product-description">
                                <div className="product-category">
                                    {props.product.category.length > 0 &&
                                        props.product.category[0]['name'][0][i18n.resolvedLanguage]}
                                </div>
                                <div className="product-title">
                                    <h3 style={{ fontSize: '18px' }}>
                                        {props.product.title[0][i18n.resolvedLanguage]}
                                    </h3>
                                </div>
                                <div className="product-price">
                                    <ins>
                                        {props.product.price} {process.env.REACT_APP_CURRENCY}
                                    </ins>
                                </div>
                                <StarRating rating={props.product.rating} />
                                <div className="product-reviews">
                                    {props.product.reviews} {t('products.customerReviews')}
                                </div>
                                <div className="seperator m-b-10"></div>
                                <p>{props.product.shortDescription[0][i18n.resolvedLanguage]}</p>
                                <div className="seperator m-t-20 m-b-10"></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <h6>{t('cart.selectQuantity')}</h6>
                                    <div className="cart-product-quantity">
                                        <div className="quantity m-l-5">
                                            <input
                                                type="button"
                                                className="minus"
                                                value="-"
                                                onClick={deductQuantityHandler}
                                            />
                                            <input type="text" className="qty" value={quantity} readOnly />
                                            <input
                                                type="button"
                                                className="plus"
                                                value="+"
                                                onClick={addQuantityHandler}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h6>{t('cart.addToCart')}</h6>
                                    <button className="btn btn-primary" onClick={addToCartHandler}>
                                        <i className="icon-shopping-cart"></i> {t('cart.addToCart')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(props.product.comments || props.product.largeDescription.length > 0) && (
                        <div className="tabs tabs-folder">
                            <ul className="nav nav-tabs" role="tablist">
                                {props.product.largeDescription.length > 0 && (
                                    <li className="nav-item" key="description">
                                        <div
                                            onClick={seeDescriptionHandler}
                                            className={`nav-link ${seeDescription ? 'active show' : ''}`}
                                            id="home-tab"
                                            data-bs-toggle="tab"
                                            href="#home3"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="false"
                                        >
                                            <i className="fa fa-align-justify"></i>
                                            {t('products.description')}
                                        </div>
                                    </li>
                                )}
                                {props.product.comments > 0 && (
                                    <li className="nav-item" key="reviews">
                                        <div
                                            onClick={seeReviewsHandler}
                                            className={`nav-link ${seeReviews ? 'active show' : ''}`}
                                            id="contact-tab"
                                            data-bs-toggle="tab"
                                            href="#contact3"
                                            role="tab"
                                            aria-controls="contact"
                                            aria-selected="false"
                                        >
                                            <i className="fa fa-star"></i>
                                            {t('products.reviews')}
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <div className="tab-content" id="myTabContent3">
                                {props.product.largeDescription.length > 0 && (
                                    <div
                                        className="tab-pane fade show"
                                        id="home3"
                                        role="tabpanel"
                                        aria-labelledby="home-tab"
                                        style={{ display: seeDescription ? 'contents' : 'none' }}
                                    >
                                        {props.product.largeDescription[0][i18n.resolvedLanguage]}
                                    </div>
                                )}
                                {props.product.comments > 0 && (
                                    <div
                                        className="tab-pane fade show"
                                        id="contact3"
                                        role="tabpanel"
                                        aria-labelledby="contact-tab"
                                        style={{ display: seeReviews ? 'block' : 'none' }}
                                    >
                                        <ProductReviews
                                            comments={props.product.comments}
                                            num_comments={props.product.reviews}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductDetailItem;
