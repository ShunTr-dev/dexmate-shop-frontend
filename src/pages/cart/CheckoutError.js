import { useParams } from 'react-router-dom';
import DeliveryInfo from '../../shared/components/UIElements/DeliveryInfo';
import PageHeader from '../../shared/components/UIElements/PageHeader';
import { useContext, useEffect } from 'react';
import CartContext from '../../shared/context/cart-context';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const CheckoutError = () => {
    const { t } = useTranslation();
    const orderId = useParams().orderId;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/carts/checkout-error/${orderId}`).then();
        //console.log('Cambio de estado de la orden a checkout-error');
    }, []);

    return (
        <>
            <PageHeader title={t('cart.orderCompletedWithErrors')} description={t('cart.errorDuringPayment')} />

            <section id="shop-checkout-completed">
                <div className="container">
                    <div className="p-t-10 m-b-20 text-center">
                        <div className="text-center">
                            <h3>{t('cart.errorDuringPayment')}</h3>
                            <p>{t('misc.contactTechSupport')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <DeliveryInfo />
        </>
    );
};

export default CheckoutError;
