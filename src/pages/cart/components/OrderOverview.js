import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import CartContext from '../../../shared/context/cart-context';
import OrderOverviewCartElement from './OrderOverviewCartElement';
import Card from '../../../shared/components/UIElements/Card';

const OrderOverview = () => {
    const { t } = useTranslation();
    const useCart = useContext(CartContext);

    //<span className="text-muted text-sm font-italic">{t('system.stepNumberOf', { step: 3, total: 3 })}</span>

    return (
        <Card>
            <h4 className="mb-4">{t('cart.orderOverview')}</h4>
            {useCart.products.map((product, index) => (
                <OrderOverviewCartElement
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    images={product.images}
                    price={product.price}
                    category={product.category}
                    quantity={product.quantity}
                    last={index === useCart.products.length - 1 ? 1 : 0}
                />
            ))}
        </Card>
    );
};

export default OrderOverview;
