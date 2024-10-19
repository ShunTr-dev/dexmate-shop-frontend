import { useTranslation } from 'react-i18next';

import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import CategoriesElement from '../../categories/components/CategoriesElement';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import { useAlert } from '../../../shared/components/Alert/react-alert';

const BrowserCategories = () => {
    const { t } = useTranslation();
    const alert = useAlert();

    return (
        <ContainerWrapper title={t('misc.browserOurCategories')}>
            <div className="shop-category">
                <div className="row">
                    <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/categories/top`}>
                        {(error, response, isLoading, makeRequest, axios) => {
                            if (error) {
                                if (error?.code === 404 || error?.code === 500) {
                                    alert.show(
                                        t('system.somethingWentWrongCouldNotFind', {
                                            element: t('navigation.categories'),
                                        })
                                    );
                                } else if (error?.code === 401) {
                                    alert.show(t('system.unauthorized'));
                                } else if (error?.code === 403) {
                                    alert.show(t('system.authenticationFailed'));
                                } else if (error?.code) {
                                    alert.show(error.code + ' - ' + error.message);
                                } else {
                                    // alert.show(t('system.somethingWentWrong'))
                                }
                            } else if (isLoading) {
                                return <LoadingSpinner />;
                            } else if (response !== null) {
                                //console.log('Haciendo petición a la API - Browser Categories');
                                // console.log(response.data);
                                return response.data.categories.map((category) => (
                                    <CategoriesElement
                                        name={category.name}
                                        id={category.id}
                                        key={category.id}
                                        image={category.image}
                                        numberOfProducts={category.numberOfProducts}
                                    />
                                ));
                            }
                            return <LoadingSpinner />;
                        }}
                    </Get>
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default BrowserCategories;
