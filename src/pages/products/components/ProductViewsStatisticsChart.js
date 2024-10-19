import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import { useTranslation } from 'react-i18next';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import ViewsChart from '../../../shared/components/UIElements/Charts/ViewsChart';
import { useAlert } from '../../../shared/components/Alert/react-alert';

const ProductViewsStatisticsChart = (props) => {
    const { t } = useTranslation();
    const alert = useAlert();

    return (
        <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/statistics/products/${props.id}`}>
            {(error, response, isLoading, makeRequest, axios) => {
                if (error) {
                    if (error?.code === 404 || error?.code === 500) {
                        alert.show(t('system.somethingWentWrongCouldNotFind', { element: t('system.statistics') }));
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
                    //console.log('Haciendo petición a la API - Product Statistics Chart');
                    // console.log(response.data);
                    return (
                        <ContainerWrapper title={t('products.views')}>
                            <ViewsChart
                                data={response.data.productStatistic.monthlyStatistics}
                                label={t('products.views')}
                            />
                        </ContainerWrapper>
                    );
                }
                return; // (<LoadingSpinner />)
            }}
        </Get>
    );
};

export default ProductViewsStatisticsChart;
