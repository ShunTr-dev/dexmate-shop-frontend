import { useTranslation } from 'react-i18next';

const DeliveryInfo = () => {
    const { t } = useTranslation();

    return (
        <section className="background-grey p-t-40 p-b-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="icon-box effect small clean">
                            <div className="icon">
                                <a href="#">
                                    <i className="fa fa-gift"></i>
                                </a>
                            </div>
                            <h3>{t('deliveryInfo.freeShipping')}</h3>
                            <p>{t('deliveryInfo.freeShippingText')}.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="icon-box effect small clean">
                            <div className="icon">
                                <a href="#">
                                    <i className="fa fa-plane"></i>
                                </a>
                            </div>
                            <h3>{t('deliveryInfo.worldwideDelivery')}</h3>
                            <p>{t('deliveryInfo.worldwideDeliveryText')}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="icon-box effect small clean">
                            <div className="icon">
                                <a href="#">
                                    <i className="fa fa-history"></i>
                                </a>
                            </div>
                            <h3>{t('deliveryInfo.moneyBack')}</h3>
                            <p>{t('deliveryInfo.moneyBackText')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeliveryInfo;
