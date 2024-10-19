import { Link, useParams } from 'react-router-dom';
import DeliveryInfo from '../../shared/components/UIElements/DeliveryInfo';
import PageHeader from '../../shared/components/UIElements/PageHeader';
import { useContext, useEffect } from 'react';
import CartContext from '../../shared/context/cart-context';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';

const CheckoutSuccess = () => {
    const { t } = useTranslation();
    const orderId = useParams().orderId;
    const cartCtx = useContext(CartContext);
    const auth = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/carts/checkout-success/${orderId}`).then();
        cartCtx.clearCart();
    }, [orderId]);

    return (
        <>
            <PageHeader title={t('cart.orderCompleted')} description={t('cart.congratulations')} />

            <section id="shop-checkout-completed">
                <div className="container">
                    <div className="p-t-10 m-b-20 text-center">
                        <div className="text-center">
                            <h3>{t('cart.congratulations')}</h3>
                            <p>
                                {!auth.isLoggedIn && (
                                    <>{t('cart.viewOrderCheckout', { order: '#475928729383746587' })}</>
                                )}
                            </p>
                        </div>

                        {!auth.isLoggedIn && (
                            <Link to="/login" className="btn icon-left m-r-10">
                                <span>{t('navigation.goToLoginPage')}</span>
                            </Link>
                        )}
                        {auth.isLoggedIn && (
                            <Link to="/orders" className="btn icon-left m-r-10">
                                <span>{t('cart.orders')}</span>
                            </Link>
                        )}
                        <Link className="btn icon-left" to="/products">
                            <span>{t('navigation.returnToShop')}</span>
                        </Link>
                    </div>
                </div>
            </section>

            <DeliveryInfo />
        </>
    );
};

export default CheckoutSuccess;
