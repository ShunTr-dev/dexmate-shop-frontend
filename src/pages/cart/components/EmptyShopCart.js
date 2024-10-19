import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const EmptyShopCart = () => {
    const { t } = useTranslation();

    return (
        <>
            <section id="shop-cart">
                <div className="container">
                    <div className="p-t-10 m-b-20 text-center">
                        <div className="heading-text heading-line text-center">
                            <h4>{t('cart.empty')}.</h4>
                        </div>
                        <Link className="btn icon-left" to="/">
                            <span>{t('cart.returnToShop')}</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmptyShopCart;
