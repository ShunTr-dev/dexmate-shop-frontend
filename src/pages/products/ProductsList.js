import { useParams } from 'react-router-dom';
import PageHeader from '../../shared/components/UIElements/PageHeader';
import ProductsListFullWidth from './components/ProducListFullWidth';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { Get } from 'react-axios';
import axiosInterceptor from '../../shared/util/axiosInterceptor';
import ItemNotFound from '../error/ItemNotFound';

const ProductsList = (props) => {
    const { t, i18n } = useTranslation();
    const categoryId = useParams().categoryId;

    let getProductsUrl;
    if (categoryId) {
        getProductsUrl = `${process.env.REACT_APP_API_BASE_URL}/api/products/category/${categoryId}`;
    } else {
        getProductsUrl = `${process.env.REACT_APP_API_BASE_URL}/api/products/list`;
    }

    return (
        <>
            {categoryId && (
                <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/categories/${categoryId}`}>
                    {(error, response, isLoading, makeRequest, axios) => {
                        if (error) {
                            <PageHeader title={t('navigation.products')} />;
                        } else if (isLoading) {
                            return <LoadingSpinner />;
                        } else if (response !== null) {
                            //console.log('Haciendo petición a la API - Products List');
                            // console.log(response.data);
                            return <PageHeader title={response.data.category.name[0][i18n.resolvedLanguage]} />;
                        }
                        return <PageHeader title={t('navigation.products')} />;
                    }}
                </Get>
            )}

            {!categoryId && <PageHeader title={t('navigation.products')} />}

            <Get url={`${getProductsUrl}`}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        return <ItemNotFound title={t('products.noProductsFound')} />;
                    } else if (isLoading) {
                        return <LoadingSpinner />;
                    } else if (response !== null) {
                        //console.log('Haciendo petición a la API - Product List Full Width');
                        return <ProductsListFullWidth products={response.data.products} />;
                    } else {
                        return <LoadingSpinner />;
                    }
                }}
            </Get>
        </>
    );
};

export default ProductsList;
