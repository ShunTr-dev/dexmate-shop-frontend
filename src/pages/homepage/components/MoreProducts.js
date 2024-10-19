import { useTranslation } from 'react-i18next';
import ProductSmallItem from '../../../shared/components/UIElements/Products/ProductSmallItem';

const MoreProducts = (props) => {
    const { t } = useTranslation();

    return (
        <div className="widget-shop">
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 mb-6">
                            <div className="heading-text heading-line">
                                <h4>{t('products.topRated')}</h4>
                            </div>
                            {props.topRatedProducts.map((product) => (
                                <ProductSmallItem
                                    key={product.id}
                                    id={product.id}
                                    images={product.images}
                                    category={product.category}
                                    rating={product.rating}
                                    title={product.title}
                                    price={product.price}
                                />
                            ))}
                        </div>

                        <div className="col-lg-4 mb-6">
                            <div className="heading-text heading-line">
                                <h4>{t('products.recommended')}</h4>
                            </div>
                            {props.recommendedProducts.map((product) => (
                                <ProductSmallItem
                                    key={product.id}
                                    id={product.id}
                                    images={product.images}
                                    category={product.category}
                                    rating={product.rating}
                                    title={product.title}
                                    price={product.price}
                                />
                            ))}
                        </div>
                        <div className="col-lg-4 mb-6">
                            <div className="heading-text heading-line">
                                <h4>{t('products.popular')}</h4>
                            </div>
                            {props.popularProducts.map((product) => (
                                <ProductSmallItem
                                    key={product.id}
                                    id={product.id}
                                    images={product.images}
                                    category={product.category}
                                    rating={product.rating}
                                    title={product.title}
                                    price={product.price}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MoreProducts;
