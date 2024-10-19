import React from 'react';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import RelatedProductsElements from './RelatedProductsElement';
import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import { useAlert } from '../../../shared/components/Alert/react-alert';

const RelatedProducts = (props) => {
    const { t } = useTranslation();
    const alert = useAlert();

    return (
        <>
            <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/products/related/${props.id}`}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        if (error?.code === 404 || error?.code === 500) {
                            alert.show(
                                t('system.somethingWentWrongCouldNotFind', { element: t('navigation.products') })
                            );
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
                        return; // <LoadingSpinner />
                    } else if (response !== null) {
                        //console.log('Haciendo petición a la API - Related Products');
                        // console.log(response.data);
                        return (
                            <ContainerWrapper title={t('products.relatedProductsText')}>
                                <div className="row">
                                    {response.data.products.map((product) => (
                                        <RelatedProductsElements
                                            key={product.id}
                                            id={product.id}
                                            images={product.images}
                                            category={product.category}
                                            rating={product.rating}
                                            title={product.title}
                                            price={product.price}
                                        />
                                    ))}
                                </div>
                            </ContainerWrapper>
                        );
                    }
                    return; // (<LoadingSpinner />)
                }}
            </Get>
        </>
    );
};

export default RelatedProducts;
