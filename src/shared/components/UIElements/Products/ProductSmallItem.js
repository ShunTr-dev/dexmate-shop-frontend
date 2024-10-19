import { Link } from 'react-router-dom';
import StarRating from '../StarRating';
import { useTranslation } from 'react-i18next';

const ProductSmallItem = (props) => {
    const { i18n } = useTranslation();

    return (
        <div className="product">
            <div className="product-image">
                <Link to={`/products/${props.id}`}>
                    <img
                        loading="lazy"
                        width="380"
                        height="507"
                        src={process.env.REACT_APP_AWS_S3_URL_BASE + props.images[0]}
                        alt={props.title[0][i18n.resolvedLanguage]}
                    />
                </Link>
            </div>
            <div className="product-description">
                <div className="product-category">
                    {props.category.length > 0 && props.category[0]['name'][0][i18n.resolvedLanguage]}
                </div>
                <div className="product-title">
                    <h3>
                        <Link to={`/products/${props.id}`}>{props.title[0][i18n.resolvedLanguage]}</Link>
                    </h3>
                </div>
                <div className="product-price">
                    <ins>
                        {props.price} {process.env.REACT_APP_CURRENCY}
                    </ins>
                </div>
                <StarRating rating={props.rating} />
            </div>
        </div>
    );
};

export default ProductSmallItem;
