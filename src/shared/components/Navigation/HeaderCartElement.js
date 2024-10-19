import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeaderCartElement = (props) => {
    const { i18n } = useTranslation();

    const deleteProductHandler = () => {
        props.removeProduct(props.id);
    };

    return (
        <div className="cart-item">
            <div className="cart-image">
                <Link to={`/products/${props.id}`}>
                    <img
                        loading="lazy"
                        src={process.env.REACT_APP_AWS_S3_URL_BASE + props.images[0]}
                        width="380"
                        height="507"
                        alt={props.title[0][i18n.resolvedLanguage]}
                    />
                </Link>
            </div>
            <div className="cart-product-meta">
                <Link to={`/products/${props.id}`}>{props.title[0][i18n.resolvedLanguage]}</Link>
                <span>
                    {props.quantity} x {props.price} {process.env.REACT_APP_CURRENCY}
                </span>
            </div>
            <div className="cart-item-remove">
                <span onClick={deleteProductHandler}>
                    <i className="icon-x"></i>
                </span>
            </div>
        </div>
    );
};

export default HeaderCartElement;
