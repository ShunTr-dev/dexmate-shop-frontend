import React from 'react';

import ProductsListElement from './ProductsListElement';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import { useAlert } from '../../../shared/components/Alert/react-alert';
import { useTranslation } from 'react-i18next';

const ProductsList = (props) => {
    const alert = useAlert();
    const { t } = useTranslation();

    return (
        <ContainerWrapper title={props.title}>
            <div className="shop">
                <div className="row">
                    {props.featuredProducts.map((product) => (
                        <ProductsListElement
                            key={product.id}
                            id={product.id}
                            isHot={product.isHot}
                            images={product.images}
                            category={product.category}
                            rating={product.rating}
                            reviews={product.reviews}
                            title={product.title}
                            price={product.price}
                            shortDescription={product.shortDescription}
                            largeDescription={product.largeDescription}
                            createdAt={product.createdAt}
                        />
                    ))}
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default ProductsList;
