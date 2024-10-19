import { useTranslation } from 'react-i18next';

const OrderOverviewCartElement = (props) => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <div className="d-flex align-items-start">
                <div className="col-4 px-0 mr-3 text-dark">
                    <img
                        loading="lazy"
                        src={process.env.REACT_APP_AWS_S3_URL_BASE + props.images[0]}
                        width="380"
                        height="507"
                        alt={props.title[0][i18n.resolvedLanguage]}
                        className="rounded img-fluid p-1"
                    />
                </div>
                <div className="flex-fill">
                    <h4 className="h6 mb-0">{props.title[0][i18n.resolvedLanguage]}</h4>
                    <small className="d-block">
                        {t('cart.quantity')}: {props.quantity}
                    </small>
                    <small className="d-block mt-2 font-weight-bold">
                        {t('cart.price')}: {props.price} {process.env.REACT_APP_CURRENCY}
                    </small>
                    <small className="d-block mt-2 font-weight-bold">
                        {t('cart.totalAmount')}: {props.price * props.quantity} {process.env.REACT_APP_CURRENCY}
                    </small>
                </div>
            </div>
            {props.last === 0 && <hr className="my-4" />}
        </>
    );
};

export default OrderOverviewCartElement;
