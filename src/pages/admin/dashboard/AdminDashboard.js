import { Get } from 'react-axios';
import Card from '../../../shared/components/UIElements/Card';
import ItemNotFound from '../../error/ItemNotFound';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import { Link } from 'react-router-dom';
import SellsChart from '../../../shared/components/UIElements/Charts/SellsChart';
import ViewsChart from '../../../shared/components/UIElements/Charts/ViewsChart';
import OrdersChart from '../../../shared/components/UIElements/Charts/OrdersChart';
import Table from '../../../shared/components/UIElements/Table';

const AdminDashboard = () => {
    const { t, i18n } = useTranslation();

    return (
        <section>
            <div className="container">
                <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/general-statistics/get-general-statistics`}>
                    {(error, response, isLoading, makeRequest, axios) => {
                        if (error) {
                            // TO DO
                            return <ItemNotFound title={t('system.elementNotFound')} />;
                        } else if (isLoading) {
                            return <LoadingSpinner />;
                        } else if (response !== null) {
                            //console.log('Haciendo petición a la API - Dashboard');

                            return (
                                <div className="row">
                                    <div className="col-lg-8">
                                        <Card>
                                            <ContainerWrapper title={t('misc.totalSells')}>
                                                <SellsChart
                                                    data={response.data.generalStatistics.monthlyStatistics}
                                                    label={t('misc.totalSells')}
                                                />
                                            </ContainerWrapper>
                                        </Card>

                                        <Card>
                                            <ContainerWrapper title={t('misc.totalViews')}>
                                                <ViewsChart
                                                    data={response.data.generalStatistics.monthlyStatistics}
                                                    label={t('misc.totalViews')}
                                                />
                                            </ContainerWrapper>
                                        </Card>

                                        <Card>
                                            <ContainerWrapper title={t('misc.totalOrders')}>
                                                <OrdersChart
                                                    data={response.data.generalStatistics.monthlyStatistics}
                                                    label={t('misc.totalOrders')}
                                                />
                                            </ContainerWrapper>
                                        </Card>

                                        <Card>
                                            <ContainerWrapper title={t('misc.topBuyers')}>
                                                <Table
                                                    columns={[
                                                        t('system.user'),
                                                        t('system.email'),
                                                        t('navigation.orders'),
                                                        t('system.elements'),
                                                        t('products.sells'),
                                                    ]}
                                                    fields={response.data.users.map((user) => {
                                                        return [
                                                            <tr key={user._id}>
                                                                <td>{user.email}</td>
                                                                <td>{user.orders}</td>
                                                                <td>{user.totalItemsInOrders}</td>
                                                                <td>
                                                                    {user.totalSpentInOrders}{' '}
                                                                    {process.env.REACT_APP_CURRENCY}
                                                                </td>
                                                            </tr>,
                                                        ];
                                                    })}
                                                />
                                            </ContainerWrapper>
                                        </Card>
                                    </div>

                                    <div className="col-lg-4">
                                        <Card>
                                            <h4 className="widget-title">{t('misc.generalStatistics')}</h4>
                                            <ul className="list list-lines">
                                                <li>
                                                    {t('misc.totalSells')}: {response.data.generalStatistics.totalSells}{' '}
                                                    {process.env.REACT_APP_CURRENCY}
                                                </li>
                                                <li>
                                                    {t('misc.totalViews')}: {response.data.generalStatistics.totalViews}
                                                </li>
                                                <li>
                                                    <Link to={'/admin/orders/list'}>
                                                        {t('misc.totalOrders')}:{' '}
                                                        {response.data.generalStatistics.totalOrders}
                                                    </Link>
                                                </li>
                                                <li>
                                                    {t('misc.totalUsers')}: {response.data.generalStatistics.totalUsers}
                                                </li>
                                                <li>
                                                    <Link to={'/products'}>
                                                        {t('misc.totalProducts')}:{' '}
                                                        {response.data.generalStatistics.totalProducts}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/products'}>
                                                        {t('misc.totalActiveProducts')}:{' '}
                                                        {response.data.generalStatistics.totalActiveProducts}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/categories/list'}>
                                                        {t('misc.totalCategories')}:{' '}
                                                        {response.data.generalStatistics.totalCategories}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Card>

                                        <Card>
                                            <h4 className="widget-title">{t('navigation.orderStatistics')}</h4>
                                            <ul className="list list-lines">
                                                <li>
                                                    <Link to={'/admin/orders/completed'}>
                                                        {t('cart.completedOrders')}:{' '}
                                                        {response.data.orderStatistiscs.completedOrders}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/admin/orders/pending'}>
                                                        {t('cart.pendingOrders')}:{' '}
                                                        {response.data.orderStatistiscs.pendingOrders}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/admin/orders/cancelled'}>
                                                        {t('cart.cancelledOrders')}:{' '}
                                                        {response.data.orderStatistiscs.cancelledOrders}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={'/admin/orders/pending-payment'}>
                                                        {t('cart.pendingPaymentOrders')}:{' '}
                                                        {response.data.orderStatistiscs.pendingPaymentOrders}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Card>

                                        <Card>
                                            <h4 className="widget-title">{t('cart.sellsByCategory')}</h4>
                                            <ul className="list list-lines">
                                                {response.data.categories.map((category) => {
                                                    return (
                                                        <li key={category._id}>
                                                            <Link to={`/products/category/${category._id}`}>
                                                                {category.name[0][i18n.resolvedLanguage]}:{' '}
                                                                {category.sells} {process.env.REACT_APP_CURRENCY}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </Card>
                                    </div>
                                </div>
                            );
                        } else {
                            //return <ItemNotFound title={t('products.noProductsFound')} />
                        }
                    }}
                </Get>
            </div>
        </section>
    );
};

export default AdminDashboard;
