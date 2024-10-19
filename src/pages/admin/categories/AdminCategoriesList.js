import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import { Link } from 'react-router-dom';
import { useAlert } from '../../../shared/components/Alert/react-alert';
import AdminCategoriesListTable from './components/AdminCategoriesListTable';

// TO DO if admin
const AdminCategoriesList = () => {
    const { t } = useTranslation();
    const alert = useAlert();

    return (
        <ContainerWrapper title={t('navigation.categories')}>
            <div className="row" style={{ textAlign: 'end' }}>
                <span style={{ textAlign: 'end' }}>
                    <Link to={`/admin/categories/add`} className="btn btn-primary">
                        {t('misc.addCategory')}
                    </Link>
                </span>
            </div>
            <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/categories/list`}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        if (error?.code === 404 || error?.code === 500) {
                            alert.show(
                                t('system.somethingWentWrongCouldNotFind', { element: t('navigation.categories') })
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
                        return <LoadingSpinner />;
                    } else if (response !== null) {
                        //console.log('Haciendo petición a la API - Categories');
                        //console.log(response.data.categories);

                        return <AdminCategoriesListTable categories={response.data.categories} />;
                    }
                    return <LoadingSpinner />;
                }}
            </Get>
        </ContainerWrapper>
    );
};

export default AdminCategoriesList;
