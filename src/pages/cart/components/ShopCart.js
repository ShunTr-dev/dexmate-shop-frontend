import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CartContext from '../../../shared/context/cart-context';
import ShopCartElement from './ShopCartElement';

const ShopCart = () => {
    const { t } = useTranslation();

    const cartCtx = useContext(CartContext);

    return (
        <section id="shop-cart">
            <div className="container">
                <div className="shop-cart">
                    <div className="table table-sm table-striped table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="cart-product-remove"></th>
                                    <th className="cart-product-thumbnail">{t('products.product')}</th>
                                    <th className="cart-product-name">{t('products.description')}</th>
                                    <th className="cart-product-price">{t('cart.unitPrice')}</th>
                                    <th className="cart-product-quantity">{t('cart.quantity')}</th>
                                    <th className="cart-product-subtotal">{t('cart.total')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartCtx.products.map((product) => (
                                    <ShopCartElement
                                        key={product.id}
                                        id={product.id}
                                        title={product.title}
                                        images={product.images}
                                        price={product.price}
                                        category={product.category}
                                        quantity={product.quantity}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row">
                        <hr className="space" />
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 p-r-10 ">
                            <div className="table-responsive">
                                <h4>{t('cart.cartSubtotal')}</h4>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td className="cart-product-name">
                                                <strong>{t('cart.cartSubtotal')}</strong>
                                            </td>
                                            <td className="cart-product-name text-end">
                                                <span className="amount">
                                                    {cartCtx.totalPrice} {process.env.REACT_APP_CURRENCY}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="cart-product-name">
                                                <strong>{t('cart.shipping')}</strong>
                                            </td>
                                            <td className="cart-product-name  text-end">
                                                <span className="amount">{t('cart.freeShipping')}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="cart-product-name">
                                                <strong>{t('cart.total')}</strong>
                                            </td>
                                            <td className="cart-product-name text-end">
                                                <span className="amount color lead">
                                                    <strong>
                                                        {cartCtx.totalPrice} {process.env.REACT_APP_CURRENCY}
                                                    </strong>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Link to="/cart/checkout" className="btn icon-left float-right">
                                <span>{t('cart.proceedToCheckout')}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopCart;
