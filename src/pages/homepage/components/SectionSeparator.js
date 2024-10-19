import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SectionSeparator = () => {
    const { t } = useTranslation();

    return (
        <section
            className="section-pattern p-t-60 p-b-30 text-center"
            style={{ backgroundImage: `url("https://dexmate-shop.s3.eu-west-3.amazonaws.com/pattern22.webp")` }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-start">
                        <h2 className="text-medium">{t('products.generateYourProductsWithAI')}</h2>
                        <p>
                            {t('products.generateYourProductsWithAIText')}.{' '}
                            <Link to="/products/add-wizard" className="read-more btn btn-inverted">
                                {t('misc.tryIt')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionSeparator;
