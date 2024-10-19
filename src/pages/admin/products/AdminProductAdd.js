import { useTranslation } from 'react-i18next';
import AdminProductForm from './components/AdminProductForm';
import { Get } from 'react-axios';
import ItemNotFound from '../../error/ItemNotFound';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

const AdminProductAdd = () => {
    const { t } = useTranslation();

    // IF ADMIN
    return (
        <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/categories/list`}>
            {(error, response, isLoading, makeRequest, axios) => {
                if (error) {
                    // TO DO
                    return <ItemNotFound title={t('products.noProductsFound')} />;
                } else if (isLoading) {
                    return <LoadingSpinner />;
                } else if (response !== null) {
                    //console.log('Haciendo petición a la API - Add Product');

                    return (
                        <AdminProductForm
                            title={t('products.addProduct')}
                            visible={true}
                            categoriesList={response.data.categories}
                            categories={[]}
                            url={`${process.env.REACT_APP_API_BASE_URL}/api/products/admin/add-product/`}
                        />
                    );
                } else {
                    //return <ItemNotFound title={t('products.noProductsFound')} />
                }
            }}
        </Get>
    );
};

export default AdminProductAdd;
