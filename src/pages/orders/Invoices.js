import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Get } from 'react-axios';
import InvoicesItems from './components/InvoicesItems';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useAlert } from '../../shared/components/Alert/react-alert';

const Invoices = () => {
    const { t } = useTranslation();
    const orderId = useParams().orderId;
    const alert = useAlert();

    return (
        <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/orders/invoice/${orderId}`}>
            {(error, response, isLoading, makeRequest, axios) => {
                if (error) {
                    if (error?.code === 404 || error?.code === 500) {
                        alert.show(t('system.somethingWentWrongCouldNotFind', { element: t('navigation.invoice') }));
                    } else if (error?.code === 401) {
                        alert.show(t('system.unauthorized'));
                    } else if (error?.code === 403) {
                        alert.show(t('system.authenticationFailed'));
                    } else if (error?.code) {
                        alert.show(error.code + ' - ' + error.message);
                    } else {
                        // TO DO: Mirar el error "Canceling last request."
                        //console.log(error);
                        // alert.show(t('system.somethingWentWrong'))
                    }
                } else if (isLoading) {
                    return <LoadingSpinner />;
                } else if (response !== null) {
                    //console.log('Haciendo petición a la API - Invoice');
                    return (
                        <section id="shop-cart">
                            <div className="container">
                                <div className="shop-cart">
                                    <div className="row" style={{ marginBottom: '40px' }}>
                                        <div className="col-md-12" style={{ marginBottom: '20px' }}>
                                            <span style={{ fontWeight: '500' }}>{t('cart.invoiceNumber')}</span>:{' '}
                                            {response.data.invoice.invoiceNumber} <br />
                                            <span style={{ fontWeight: '500' }}>{t('cart.invoiceDate')}</span>:{' '}
                                            {response.data.invoice.createdAt.replace(/T/, ' ').replace(/\..+/, '')}{' '}
                                            <br />
                                        </div>
                                        <div className="col-md-6">
                                            <span style={{ fontWeight: '500' }}>{t('cart.invoiceTo')}</span>:{' '}
                                            {response.data.invoice.billingAddress.name} <br />
                                            {response.data.invoice.billingAddress.address},{' '}
                                            {response.data.invoice.billingAddress.address2},{' '}
                                            {response.data.invoice.billingAddress.zipCode},{' '}
                                            {response.data.invoice.billingAddress.city},{' '}
                                            {response.data.invoice.billingAddress.country} <br />
                                        </div>
                                        <div className="col-md-6">
                                            <span style={{ fontWeight: '500' }}>{t('cart.invoiceFrom')}</span>:{' '}
                                            {process.env.REACT_APP_SHOP_NAME} <br />
                                            {process.env.REACT_APP_SHOP_ADDRESS}, {process.env.REACT_APP_SHOP_ADDRESS2},{' '}
                                            {process.env.REACT_APP_SHOP_ZIP}, {process.env.REACT_APP_SHOP_CITY},{' '}
                                            {process.env.REACT_APP_SHOP_COUNTRY} <br />
                                        </div>
                                    </div>
                                    <div className="table table-sm table-striped table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="cart-product-thumbnail">{t('products.product')}</th>
                                                    <th className="cart-product-price">{t('cart.unitPrice')}</th>
                                                    <th className="cart-product-quantity">{t('cart.quantity')}</th>
                                                    <th className="cart-product-subtotal">{t('cart.total')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {response.data.invoice.products.map((product) => (
                                                    <InvoicesItems
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
                                                                <strong>{t('cart.totalWithOutVAT')}</strong>
                                                            </td>
                                                            <td className="cart-product-name text-end">
                                                                <span className="amount">
                                                                    {response.data.invoice.totalPriceWithOutVAT}{' '}
                                                                    {process.env.REACT_APP_CURRENCY}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="cart-product-name">
                                                                <strong>{t('cart.totalVAT')}</strong>
                                                            </td>
                                                            <td className="cart-product-name  text-end">
                                                                <span className="amount">
                                                                    {response.data.invoice.priceVAT}{' '}
                                                                    {process.env.REACT_APP_CURRENCY} (
                                                                    {response.data.invoice.VAT}%)
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="cart-product-name">
                                                                <strong>{t('cart.total')}</strong>
                                                            </td>
                                                            <td className="cart-product-name text-end">
                                                                <span className="amount color lead">
                                                                    <strong>
                                                                        {response.data.invoice.totalPrice}{' '}
                                                                        {process.env.REACT_APP_CURRENCY}
                                                                    </strong>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                }
            }}
        </Get>
    );
};

export default Invoices;
