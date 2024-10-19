import { useContext } from 'react';
import CartContext from '../../context/cart-context';
import HeaderCartElement from './HeaderCartElement';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeaderCart = () => {
    const { t } = useTranslation();
    const cartCtx = useContext(CartContext);

    return (
        <div className="widget widget-mycart p-cb">
            <h4>{t('cart.myCart')}</h4>
            {cartCtx.products.map((product) => (
                <HeaderCartElement
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    images={product.images}
                    price={product.price}
                    quantity={product.quantity}
                    removeProduct={cartCtx.removeFullProductToCart}
                />
            ))}

            <hr className="space" />
            <div className="cart-total">
                <div className="cart-total-labels">
                    <span>
                        <strong>{t('cart.total')}</strong>
                    </span>
                </div>
                <div className="cart-total-prices">
                    <span>
                        <strong>
                            {cartCtx.totalPrice} {process.env.REACT_APP_CURRENCY}
                        </strong>
                    </span>
                </div>
            </div>
            <div className="cart-buttons text-end">
                <Link to="/cart/checkout" className="btn btn-xs">
                    {t('cart.checkout')}
                </Link>
            </div>
        </div>
    );
};

export default HeaderCart;
