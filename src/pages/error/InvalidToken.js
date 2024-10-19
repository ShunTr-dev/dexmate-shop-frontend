import { useTranslation } from 'react-i18next';

const InvalidToken = () => {
    const { t } = useTranslation();

    return (
        <section className="m-t-80 p-b-150">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="page-error-404">401</div>
                    </div>
                    <div className="col-lg-6">
                        <div className="text-start">
                            <h1 className="text-medium">{t('system.invalidToken')}</h1>
                            <p className="lead">{t('system.invalidToken')}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InvalidToken;
