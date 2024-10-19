import { useTranslation } from 'react-i18next';

import Footer from '../../shared/components/Navigation/Footer';
import HeaderMain from '../../shared/components/Navigation/HeaderMain';

const PageNotFound = () => {
    const { t } = useTranslation();

    return (
        <>
            <HeaderMain />
            <section className="m-t-80 p-b-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-error-404">404</div>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-start">
                                <h1 className="text-medium">{t('system.pageNotFound')}</h1>
                                <p className="lead">{t('system.pageNotFoundText')}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default PageNotFound;
