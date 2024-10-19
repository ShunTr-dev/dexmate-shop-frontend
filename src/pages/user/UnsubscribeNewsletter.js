import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const UnsubscribeNewsletter = () => {
    const { t } = useTranslation();
    const unsubscribeToken = useParams().unsubscribeToken;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/unsubscribe-newsletter/${unsubscribeToken}`).then();
        //console.log('Petición para desuscribirse de la newsletter');
    }, []);

    return (
        <>
            <section className="m-t-80 p-b-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-error-404">{t('misc.newsletter')}</div>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-start">
                                <h1 className="text-medium">{t('misc.unsubscribedNewsletter')}</h1>
                                <p className="lead">{t('misc.unsubscribedNewsletterText')}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UnsubscribeNewsletter;
