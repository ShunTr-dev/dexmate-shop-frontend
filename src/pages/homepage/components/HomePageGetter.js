import ProductSmallItem from '../../../shared/components/UIElements/Products/ProductSmallItem';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import { useAlert } from '../../../shared/components/Alert/react-alert';
import { useTranslation } from 'react-i18next';
import MoreProducts from './MoreProducts';
import ProductsList from '../../products/components/ProductsList';

const HomePageGetter = (props) => {
    const alert = useAlert();
    const { t } = useTranslation();

    return (
        <Get url={`${props.url}`}>
            {(error, response, isLoading, makeRequest, axios) => {
                if (error) {
                    if (error?.code === 404 || error?.code === 500) {
                        alert.show(t('system.somethingWentWrongCouldNotFind', { element: t('navigation.products') }));
                    } else if (error?.code === 401) {
                        alert.show(t('system.unauthorized'));
                    } else if (error?.code === 403) {
                        alert.show(t('system.authenticationFailed'));
                    } else if (error?.code) {
                        alert.show(error.code + ' - ' + error.message);
                    } else {
                        // TO DO Mirar por que esto da error "Canceling last request."
                        // console.log(error);
                        // alert.show(t('system.somethingWentWrong'))
                    }
                } else if (isLoading) {
                    return <LoadingSpinner />;
                } else if (response !== null) {
                    //console.log('Haciendo petición a la API - HomePageContentGetter');

                    return (
                        <>
                            <ProductsList
                                featuredProducts={response.data.featuredProducts}
                                title={t('products.featuredProducts')}
                            />
                            <MoreProducts
                                topRatedProducts={response.data.topRatedProducts}
                                recommendedProducts={response.data.recommendedProducts}
                                popularProducts={response.data.popularProducts}
                            />
                        </>
                    );
                }
                return <LoadingSpinner />;
            }}
        </Get>
    );
};

export default HomePageGetter;
