import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import RelatedProducts from './components/RelatedProducts';
import ProductSellsStatisticsChart from './components/ProductSellsStatisticsChart';
import ProductViewsStatisticsChart from './components/ProductViewsStatisticsChart';
import { AuthContext } from '../../shared/context/auth-context';

const ProductSingle = (props) => {
    const productId = useParams().productId;
    const auth = useContext(AuthContext);

    return (
        <>
            <ProductDetail id={productId} />
            {auth.isLoggedIn && auth.isAdmin && (
                <>
                    <ProductSellsStatisticsChart id={productId} />
                    <ProductViewsStatisticsChart id={productId} />
                </>
            )}

            <RelatedProducts id={productId} />
        </>
    );
};

export default ProductSingle;
