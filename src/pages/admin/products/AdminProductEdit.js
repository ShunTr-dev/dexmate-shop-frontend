import { useTranslation } from 'react-i18next';
import AdminProductForm from './components/AdminProductForm';
import { Get } from 'react-axios';
import ItemNotFound from '../../error/ItemNotFound';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useParams } from 'react-router-dom';

const AdminProductEdit = (props) => {
    const { t } = useTranslation();
    const productId = useParams().productId;

    // TO DO: IF ADMIN
    return (
        <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/products/admin/getInfoToedit/${productId}`}>
            {(error, response, isLoading, makeRequest, axios) => {
                if (error) {
                    // TO DO
                    return <ItemNotFound title={t('products.noProductsFound')} />;
                } else if (isLoading) {
                    return <LoadingSpinner />;
                } else if (response !== null) {
                    //console.log('Haciendo petición a la API - Edit Product');

                    return (
                        <AdminProductForm
                            title={t('products.editProduct')}
                            url={`${process.env.REACT_APP_API_BASE_URL}/api/products/admin/edit-product/`}
                            categoriesList={response.data.categories}
                            id={response.data.product.id}
                            actualImages={response.data.product.images}
                            categories={response.data.product.category}
                            titleEs={response.data.product.title[0]['es']}
                            titleEn={response.data.product.title[0]['en']}
                            price={response.data.product.price}
                            shortDescriptionEs={response.data.product.shortDescription[0]['es']}
                            shortDescriptionEn={response.data.product.shortDescription[0]['en']}
                            largeDescriptionEs={response.data.product.largeDescription[0]['es']}
                            largeDescriptionEn={response.data.product.largeDescription[0]['en']}
                            visible={response.data.product.visible}
                            SKU={response.data.product.SKU}
                            stock={response.data.product.stock}
                            weight={response.data.product.weight}
                            dimensions={response.data.product.dimensions}
                        />
                    );
                } else {
                    //return <ItemNotFound title={t('products.noProductsFound')} />
                }
            }}
        </Get>
    );
};

export default AdminProductEdit;
