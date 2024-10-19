import Atropos from 'atropos/react';
import 'atropos/css';

import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FrontPageAtroposHeader = ({ children }) => {
    const { t } = useTranslation();

    return (
        <Atropos style={{ width: '100%', minHeight: '300px' }} activeOffset={40} shadow={false}>
            <section className="section-pattern p-t-60 p-b-30 text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 p-t-60 p-b-30">
                            <span className="text-center text-dark" style={{ fontSize: '10.5vw', fontWeight: 'bold' }}>
                                {process.env.REACT_APP_SHOP_NAME.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-start">
                            <h2 className="text-medium text-center">{t('products.generateYourProductsWithAI')}</h2>
                            <p className="text-center">
                                <Link to="/products/add-wizard" className="read-more btn btn-inverted">
                                    {t('misc.tryIt')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Atropos>
    );
};

export default FrontPageAtroposHeader;
