import { useTranslation } from 'react-i18next';
import { Get } from 'react-axios';
import axiosInterceptor from '../../../shared/util/axiosInterceptor';
import ContainerWrapper from '../../../shared/components/UIElements/ContainerWrapper';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import Table from '../../../shared/components/UIElements/Table';
import { useAlert } from '../../../shared/components/Alert/react-alert';

const Logs = () => {
    const { t } = useTranslation();
    const alert = useAlert();

    const columns = ['METHOD', 'URL', 'Host', 'Origin', 'User-Agent', 'User-Agent Brand', 'Platform', 'Date'];

    return (
        <ContainerWrapper title={t('system.logs')}>
            <Get url={`${process.env.REACT_APP_API_BASE_URL}/api/logs/log`}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        if (error?.code === 404 || error?.code === 500) {
                            alert.show(t('system.somethingWentWrongCouldNotFind', { element: t('system.logs') }));
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
                        //console.log('Haciendo petición a la API - Logs');

                        return (
                            <Table
                                columns={columns}
                                fields={response.data.logs.map((log) => {
                                    return [
                                        <tr key={log.id}>
                                            <td>{log.method}</td>
                                            <td>{log.url}</td>
                                            <td>{log.headers.host}</td>
                                            <td>{log.headers.origin}</td>
                                            <td>{log.headers['user-agent'].split(' ')[0]}</td>
                                            <td>{log.headers['sec-ch-ua']}</td>
                                            <td>{log.headers['sec-ch-ua-platform']}</td>
                                            <td>{log.createdAt.replace(/T/, ' ').replace(/\..+/, '')}</td>
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

export default Logs;
