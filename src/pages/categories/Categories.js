import React from 'react';
import CategoriesElement from './components/CategoriesElement';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PageHeader from '../../shared/components/UIElements/PageHeader';
import { useTranslation } from 'react-i18next';
import { Get } from 'react-axios';
import axiosInterceptor from '../../shared/util/axiosInterceptor';
import { useAlert } from '../../shared/components/Alert/react-alert';

const Categories = () => {
    const { t } = useTranslation();
    const alert = useAlert();

    return (
        <>
            <PageHeader title={t('navigation.categories')} />
            <section>
                <div className="container">
                    <div className="shop-category">
                        <div className="row">
                            <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/categories/list`}>
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
                                            // TO DO: Mirar el error "Canceling last request."
                                            //console.log(error);
                                            // alert.show(t('system.somethingWentWrong'))
                                        }
                                    } else if (isLoading) {
                                        return <LoadingSpinner />;
                                    } else if (response !== null) {
                                        //console.log('Haciendo petición a la API - Categories');
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
                </div>
            </section>
        </>
    );
};

export default Categories;
