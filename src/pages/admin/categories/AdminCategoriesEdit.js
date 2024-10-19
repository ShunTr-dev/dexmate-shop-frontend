import { useTranslation } from 'react-i18next';
import { Get } from 'react-axios';
import ItemNotFound from '../../error/ItemNotFound';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useParams } from 'react-router-dom';
import AdminCategoryForm from './components/AdminCategoryForm';

const AdminCategoriesEdit = (props) => {
    const { t } = useTranslation();
    const categoryId = useParams().categoryId;

    // TO DO: IF ADMIN
    return (
        <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/categories/admin/getInfoToedit/${categoryId}`}>
            {(error, response, isLoading, makeRequest, axios) => {
                if (error) {
                    // TO DO
                    return <ItemNotFound title={t('system.elementNotFound')} />;
                } else if (isLoading) {
                    return <LoadingSpinner />;
                } else if (response !== null) {
                    //console.log('Haciendo petición a la API - Edit Category');

                    return (
                        <AdminCategoryForm
                            title={t('misc.editCategory')}
                            url={`${process.env.REACT_APP_API_BASE_URL}/api/categories/admin/edit-category/`}
                            id={response.data.category.id}
                            actualImages={response.data.category.image}
                            nameEs={response.data.category.name[0]['es']}
                            nameEn={response.data.category.name[0]['en']}
                        />
                    );
                } else {
                    //return <ItemNotFound title={t('products.noProductsFound')} />
                }
            }}
        </Get>
    );
};

export default AdminCategoriesEdit;
