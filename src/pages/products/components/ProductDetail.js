import React from 'react';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import ProductDetailItem from './ProductDetailItem';
import ItemNotFound from '../../error/ItemNotFound';
import { useTranslation } from 'react-i18next';

const ProductDetail = (props) => {
    const { t } = useTranslation();

    return (
        // TO DO
        <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/products/${props.id}`}>
            {(error, response, isLoading, makeRequest, axios) => {
                if (error) {
                    return <ItemNotFound title={t('products.noProductsFound')} />;
                } else if (isLoading) {
                    return <LoadingSpinner />;
                } else if (response !== null) {
                    //console.log('Haciendo petición a la API - Product Detail');
                    return <ProductDetailItem product={response.data.product} />;
                } else {
                    return <ItemNotFound title={t('products.noProductsFound')} />;
                }
            }}
        </Get>
    );
};

export default ProductDetail;
