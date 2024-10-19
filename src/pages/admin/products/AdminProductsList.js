import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import { Link } from 'react-router-dom';
import { useAlert } from '../../../shared/components/Alert/react-alert';
import AdminProductsListTable from './components/AdminProductListTable';

// TO DO if
const AdminProductsList = () => {
    const { t } = useTranslation();
    const alert = useAlert();

    return (
        <ContainerWrapper title={t('products.products')}>
            <div className="row" style={{ textAlign: 'end' }}>
                <span style={{ textAlign: 'end' }}>
                    <Link to={`/products/add-wizard`} className="btn btn-primary">
                        {t('products.generateProductWithAI')}
                    </Link>
                    <Link to={`/admin/products/add`} className="btn btn-primary">
                        {t('products.addProduct')}
                    </Link>
                </span>
            </div>
            <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/products/admin/list`}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        if (error?.code === 404 || error?.code === 500) {
                            alert.show(t('system.somethingWentWrongCouldNotFind', { element: t('products.products') }));
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
                        //console.log('Haciendo petición a la API - Products');

                        return <AdminProductsListTable products={response.data.products} />;
                    }
                    return <LoadingSpinner />;
                }}
            </Get>
        </ContainerWrapper>
    );
};

export default AdminProductsList;
