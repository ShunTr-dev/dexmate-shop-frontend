import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CategoriesElement = (props) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="col-lg-3">
            <div className="shop-category-box">
                <Link to={`/products/category/${props.id}`}>
                    <img
                        loading="lazy"
                        alt=""
                        width="380"
                        height="507"
                        src={process.env.REACT_APP_AWS_S3_URL_BASE + props.image}
                    />
                    <div className="shop-category-box-title text-center">
                        <h5>{props.name[0][i18n.resolvedLanguage]}</h5>
                        <small>
                            {props.numberOfProducts} {t('products.products')}
                        </small>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CategoriesElement;
