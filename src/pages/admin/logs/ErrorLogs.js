import { useTranslation } from 'react-i18next';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import Table from '../../../shared/components/UIElements/Table';
import { useAlert } from '../../../shared/components/Alert/react-alert';

const ErrorLogs = () => {
    const { t } = useTranslation();
    const alert = useAlert();

    const columns = ['METHOD', 'Code', 'URL', 'Message', 'Date', 'User-Agent', 'Platform'];

    return (
        <ContainerWrapper title={t('system.logs')}>
            <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/logs/error-log`}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        if (error?.code === 404 || error?.code === 500) {
                            alert.show(t('system.somethingWentWrongCouldNotFind', { element: t('system.errorLogs') }));
                        } else if (error?.code === 401) {
                            alert.show(t('system.unauthorized'));
                        } else if (error?.code === 403) {
                            alert.show(t('system.authenticationFailed'));
                        } else if (error?.code) {
                            alert.show(error.code + ' - ' + error.message);
                        } else {
                            // TO DO: Mirar el error "Canceling last request."
                            //console.log(error);
                            // alert.show(t('system.somethingWentWrong'))
                        }
                    } else if (isLoading) {
                        return <LoadingSpinner />;
                    } else if (response !== null) {
                        //console.log('Haciendo petición a la API - ErrorLogs');

                        return (
                            <Table
                                columns={columns}
                                fields={response.data.errorLogs.map((errorLog) => {
                                    return [
                                        <tr key={errorLog.id}>
                                            <td>{errorLog.method}</td>
                                            <td>{errorLog.errorCode}</td>
                                            <td>{errorLog.url}</td>
                                            <td>{errorLog.message}</td>
                                            <td>{errorLog.createdAt.replace(/T/, ' ').replace(/\..+/, '')}</td>
                                            <td>{errorLog.headers['user-agent'].split(' ')[0]}</td>
                                            <td>{errorLog.headers['sec-ch-ua-platform']}</td>
                                        </tr>,
                                    ];
                                })}
                            />
                        );
                    }
                    return <LoadingSpinner />;
                }}
            </Get>
        </ContainerWrapper>
    );
};

export default ErrorLogs;
