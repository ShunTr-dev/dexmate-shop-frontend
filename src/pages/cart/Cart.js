import { useContext } from 'react';

import DeliveryInfo from '../../shared/components/UIElements/DeliveryInfo';
import PageHeader from '../../shared/components/UIElements/PageHeader';
import ShopCart from './components/ShopCart';
import EmptyShopCart from './components/EmptyShopCart';

import CartContext from '../../shared/context/cart-context';
import { useTranslation } from 'react-i18next';

const Cart = () => {
    const { t } = useTranslation();
    const cartCtx = useContext(CartContext);

    return (
        <>
            <PageHeader title={t('cart.shoppingCart')} description={t('cart.shoppingDetails')} />
            {cartCtx.totalElements > 0 && <ShopCart />}
            {cartCtx.totalElements === 0 && <EmptyShopCart />}
            <DeliveryInfo />
        </>
    );
};

export default Cart;
