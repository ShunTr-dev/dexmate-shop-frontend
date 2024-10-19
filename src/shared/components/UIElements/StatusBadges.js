import { useTranslation } from 'react-i18next';
import Badge from './Badge';

const StatusBadges = (props) => {
    const { t } = useTranslation();

    switch (props.status) {
        //- Order status --------------------------------------------------------------------------------
        case '64be4af990b134d92ec1b693': // Pending
            return <Badge type="warning">{t('system.pending')}</Badge>;
        case '64be4b0c90b134d92ec1b694': // Processing
            return <Badge type="warning">{t('system.processing')}</Badge>;
        case '64be4b1990b134d92ec1b695': // Completed
            return <Badge type="success">{t('system.completed')}</Badge>;
        case '64be4b2c90b134d92ec1b696': // Cancelled by user
            return <Badge type="danger">{t('system.cancelledByUser')}</Badge>;
        case '64be4b3d90b134d92ec1b697': // Cancelled by Shop
            return <Badge type="danger">{t('system.cancelledByShop')}</Badge>;
        case '64c23afd65345b09ea11099e': // Cancelled by error payment
            return <Badge type="danger">{t('system.cancelledByErrorPayment')}</Badge>;
        //- Shipping status --------------------------------------------------------------------------------
        case '64be4e9190b134d92ec1b6a8': // Pending
            return <Badge type="warning">{t('system.pending')}</Badge>;
        case '64be4e9d90b134d92ec1b6a9': // Processing
            return <Badge type="warning">{t('system.processing')}</Badge>;
        case '64be4ea490b134d92ec1b6aa': // Completed
            return <Badge type="success">{t('system.completed')}</Badge>;
        case '64be4eab90b134d92ec1b6ab': // Cancelled
            return <Badge type="danger">{t('system.cancelled')}</Badge>;
        //- Payment status --------------------------------------------------------------------------------
        case '64be514790b134d92ec1b6b6': // Pending confirmation
            return <Badge type="warning">{t('system.pendingConfirmation')}</Badge>;
        case '64be515290b134d92ec1b6b7': // Processing
            return <Badge type="warning">{t('system.processing')}</Badge>;
        case '64be515890b134d92ec1b6b8': // Completed
            return <Badge type="success">{t('system.completed')}</Badge>;
        case '64be515d90b134d92ec1b6b9': // Cancelled
            return <Badge type="danger">{t('system.cancelled')}</Badge>;
        default:
            return <Badge>{t('system.unknown')}</Badge>;
    }
};

export default StatusBadges;
