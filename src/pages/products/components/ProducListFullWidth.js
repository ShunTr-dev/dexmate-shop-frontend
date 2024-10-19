import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ProductsListFullWidthElement from './ProductListFullWidthElement';
import ItemNotFound from '../../error/ItemNotFound';

const ProductsListFullWidth = (props) => {
    const { t } = useTranslation();

    const [selectedFilter, setSelectedFilter] = useState('sells');
    const [products, setProducts] = useState(props.products);
    const [productsToShow, setProductsToShow] = useState();

    const highestPrice = Math.max(...props.products.map((p) => p.price), 0);
    const minPrice = Math.min(...props.products.map((p) => p.price), highestPrice);

    //let products = props.products;
    useEffect(() => {
        if (products.length > 0) {
            if (selectedFilter === 'sells') {
                setProducts(products.sort((a, b) => b.sells - a.sells));
            } else if (selectedFilter === 'rating') {
                setProducts(products.sort((a, b) => b.rating - a.rating));
            } else if (selectedFilter === 'price') {
                setProducts(products.sort((a, b) => a.price - b.price));
            } else if (selectedFilter === 'price-desc') {
                setProducts(products.sort((a, b) => b.price - a.price));
            }

            setProductsToShow(
                products.map((product) => (
                    <ProductsListFullWidthElement
                        key={product.id}
                        id={product.id}
                        isHot={product.isHot}
                        images={product.images}
                        category={product.category}
                        rating={product.rating}
                        reviews={product.reviews}
                        title={product.title}
                        shortDescription={product.shortDescription}
                        largeDescription={product.largeDescription}
                        createdAt={product.createdAt}
                        price={product.price}
                    />
                ))
            );
        } else {
            setProductsToShow(<ItemNotFound title={t('products.noProductsFound')} />);
        }

        //setProductsToShow(null);
    }, [products, selectedFilter]);

    const setSelectedOrderFilterHandler = (event) => {
        setSelectedFilter(event.target.value);
    };

    const setPriceFilterHandler = (event) => {
        const typePriceFilter = event.target.value;

        let minPriceFilter = 0;
        let maxPriceFilter = highestPrice;

        if (typePriceFilter === '1') {
            minPriceFilter = 0;
            maxPriceFilter = highestPrice / 4;
        } else if (typePriceFilter === '2') {
            minPriceFilter = highestPrice / 4;
            maxPriceFilter = highestPrice / 2;
        } else if (typePriceFilter === '3') {
            minPriceFilter = highestPrice / 2;
            maxPriceFilter = Math.round(highestPrice / 1.333333);
        } else if (typePriceFilter === '4') {
            minPriceFilter = Math.round(highestPrice / 1.333333);
            maxPriceFilter = highestPrice;
        }
        setProducts(props.products.filter((p) => p.price >= minPriceFilter && p.price <= maxPriceFilter));
    };

    return (
        <section>
            <div className="container">
                <div className="row m-b-20">
                    <div className="col-lg-6 p-t-10 m-b-20">
                        <h3 className="m-b-20">
                            {t('misc.collectionFall')} {new Date().getFullYear()}
                        </h3>
                        <p>{t('misc.yourSkin')}.</p>
                    </div>

                    <div className="col-lg-3">
                        <div className="order-select">
                            <h6>{t('system.sortBy')}</h6>
                            {productsToShow?.length > 0 && (
                                <p>
                                    {productsToShow.length} {t('system.results')}
                                </p>
                            )}
                            {!productsToShow?.length && <p>0 {t('system.results')}</p>}
                            {productsToShow?.length > 0 && (
                                <form method="get">
                                    <select className="form-select" onChange={setSelectedOrderFilterHandler}>
                                        <option value="sells">
                                            {t('system.sortBy')} {t('products.popularity')}
                                        </option>
                                        <option value="rating">
                                            {t('system.sortBy')} {t('products.averageRating')}
                                        </option>
                                        <option value="price">
                                            {t('system.sortBy')} {t('cart.price')}: {t('system.lowToHigh')}
                                        </option>
                                        <option value="price-desc">
                                            S{t('system.sortBy')} {t('cart.price')}: {t('system.highToLow')}
                                        </option>
                                    </select>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="order-select">
                            <h6>
                                {t('system.sortBy')} {t('cart.price')}
                            </h6>
                            <p>
                                {t('misc.from')} {minPrice} - {highestPrice} {process.env.REACT_APP_CURRENCY}
                            </p>

                            {highestPrice > 0 && (
                                <form method="get">
                                    <select className="form-select" onChange={setPriceFilterHandler}>
                                        <option value="0">
                                            0 {process.env.REACT_APP_CURRENCY} - {highestPrice}{' '}
                                            {process.env.REACT_APP_CURRENCY}
                                        </option>
                                        <option value="1">
                                            0 {process.env.REACT_APP_CURRENCY} - {highestPrice / 4}{' '}
                                            {process.env.REACT_APP_CURRENCY}
                                        </option>
                                        <option value="2">
                                            {highestPrice / 4} {process.env.REACT_APP_CURRENCY} - {highestPrice / 2}{' '}
                                            {process.env.REACT_APP_CURRENCY}
                                        </option>
                                        <option value="3">
                                            {highestPrice / 2} {process.env.REACT_APP_CURRENCY} -{' '}
                                            {Math.round(highestPrice / 1.333333)} {process.env.REACT_APP_CURRENCY}
                                        </option>
                                        <option value="4">
                                            {Math.round(highestPrice / 1.333333)} {process.env.REACT_APP_CURRENCY} -{' '}
                                            {highestPrice} {process.env.REACT_APP_CURRENCY}
                                        </option>
                                    </select>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="shop">
                    <div className="row">{productsToShow}</div>
                </div>
            </div>
        </section>
    );
};

export default ProductsListFullWidth;
