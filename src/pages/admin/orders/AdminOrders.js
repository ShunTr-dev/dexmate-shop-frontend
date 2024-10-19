import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import Table from '../../../shared/components/UIElements/Table';
import StatusBadges from '../../../shared/components/UIElements/StatusBadges';
import Badge from '../../../shared/components/UIElements/Badge';
import { Link } from 'react-router-dom';
import { useAlert } from '../../../shared/components/Alert/react-alert';

const Orders = () => {
    const { t } = useTranslation();
    const alert = useAlert();

    const columns = [
        t('system.identifier'),
        t('system.date'),
        t('system.status'),
        t('system.paymentStatus'),
        t('system.elements'),
        t('cart.total'),
        '',
    ];

    let url = `${process.env.REACT_APP_API_BASE_URL}/api/orders/admin/list`;
    let title = t('cart.orders');
    if (window.location.pathname.split('/').pop() === 'completed') {
        url = `${process.env.REACT_APP_API_BASE_URL}/api/orders/admin/list/completed`;
        title = t('cart.completedOrders');
    } else if (window.location.pathname.split('/').pop() === 'pending') {
        url = `${process.env.REACT_APP_API_BASE_URL}/api/orders/admin/list/pending`;
        title = t('cart.pendingOrders');
    } else if (window.location.pathname.split('/').pop() === 'cancelled') {
        url = `${process.env.REACT_APP_API_BASE_URL}/api/orders/admin/list/cancelled`;
        title = t('cart.cancelledOrders');
    } else if (window.location.pathname.split('/').pop() === 'pending-payment') {
        url = `${process.env.REACT_APP_API_BASE_URL}/api/orders/admin/list/pending-payment`;
        title = t('cart.pendingPaymentOrders');
    }

    return (
        <ContainerWrapper title={title}>
            <div className="row" style={{ textAlign: 'end' }}>
                <span style={{ textAlign: 'end' }}>
                    <Link to={`/admin/orders/completed`} className="btn btn-success">
                        {t('cart.completedOrders')}
                    </Link>
                    <Link to={`/admin/orders/pending`} className="btn btn-warning">
                        {t('cart.pendingOrders')}
                    </Link>
                    <Link to={`/admin/orders/cancelled`} className="btn btn-danger">
                        {t('cart.cancelledOrders')}
                    </Link>
                </span>
            </div>
            <Get url={url}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        if (error?.code === 404 || error?.code === 500) {
                            alert.show(t('system.somethingWentWrongCouldNotFind', { element: t('navigation.orders') }));
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
                        //console.log('Haciendo petición a la API - Orders');

                        return (
                            <Table
                                columns={columns}
                                fields={response.data.orders.map((order) => {
                                    return [
                                        <tr key={order.id}>
                                            <td>{order.id.toUpperCase()}</td>
                                            <td>{order.createdAt.replace(/T/, ' ').replace(/\..+/, '')}</td>
                                            <td>
                                                <StatusBadges status={order.status} />
                                            </td>
                                            <td>
                                                <StatusBadges status={order.paymentStatus} />
                                            </td>
                                            <td>{order.totalElements}</td>
                                            <td>
                                                {order.totalPrice} {process.env.REACT_APP_CURRENCY}
                                            </td>
                                            <td>
                                                <Link to={`/orders/invoice/${order.id}`}>
                                                    <Badge>{t('navigation.invoice')}</Badge>
                                                </Link>
                                            </td>
                                        </tr>,
                                    ];
                                })}
                            />
                        );
                    }
                    return <LoadingSpinner />;
                }}
            </Get>
        </ContainerWrapper>
    );
};

export default Orders;
