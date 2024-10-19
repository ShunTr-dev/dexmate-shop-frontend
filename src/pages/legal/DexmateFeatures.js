import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../shared/components/UIElements/ContainerWrapper';

const DexmateFeatures = () => {
    const { t } = useTranslation();

    return (
        <ContainerWrapper title={t('navigation.features')}>
            <img
                loading="lazy"
                src="https://dexmate-shop.s3.eu-west-3.amazonaws.com/diagrama-dexmate.webp"
                alt="Arquitectura del Sistema"
            />
            <h2>{t('dexmate_features.introduction')}</h2>
            <p>{t('dexmate_features.introductionText')}</p>
            <h2>{t('dexmate_features.systemArchitecture')}</h2>
            <p>{t('dexmate_features.systemArchitectureText')}:</p>
            <ul>
                <li>
                    <strong>{t('dexmate_features.frontend')}:</strong> {t('dexmate_features.frontendSimpleText')}.
                </li>
                <li>
                    <strong>{t('dexmate_features.backend')}:</strong> {t('dexmate_features.backendSimpleText')}.
                </li>
                <li>
                    <strong>{t('dexmate_features.database')}:</strong> {t('dexmate_features.databaseSimpleText')}.
                </li>
                <li>
                    <strong>{t('dexmate_features.imageHosting')}:</strong>{' '}
                    {t('dexmate_features.imageHostingSimpleText')}.
                </li>
                <li>
                    <strong>{t('dexmate_features.emailSending')}:</strong> SendGrid.
                </li>
                <li>
                    <strong>{t('dexmate_features.translations')}:</strong> DeepL.
                </li>
                <li>
                    <strong>{t('dexmate_features.imageGeneration')}:</strong> DALL-E.
                </li>
                <li>
                    <strong>{t('dexmate_features.paymentPassing')}:</strong> Stripe.
                </li>
                <li>
                    <strong>{t('dexmate_features.monitoringService')}:</strong> Uptime Robot.
                </li>
            </ul>
            <h4>{t('dexmate_features.frontend')}</h4>
            <h6>{t('dexmate_features.usedTechnologies')}</h6>
            <ul>
                <li>
                    <strong>React:</strong> {t('dexmate_features.reactText')}.
                </li>
                <li>
                    <strong>Vercel:</strong> {t('dexmate_features.vercelText')}.
                </li>
            </ul>
            <h4>{t('dexmate_features.backend')}</h4>
            <h6>{t('dexmate_features.usedTechnologies')}</h6>
            <ul>
                <li>
                    <strong>Node.js:</strong> {t('dexmate_features.nodeText')}.
                </li>
                <li>
                    <strong>Express:</strong> {t('dexmate_features.expressText')}.
                </li>
                <li>
                    <strong>Netlify:</strong> {t('dexmate_features.netlifyText')}.
                </li>
            </ul>
            <h4>{t('dexmate_features.database')}</h4>
            <h6>{t('dexmate_features.usedTechnologies')}</h6>
            <ul>
                <li>
                    <strong>MongoDB + Atlas:</strong> {t('dexmate_features.mongoDBText')}.
                </li>
            </ul>
            <h4>{t('dexmate_features.imageHosting')}</h4>
            <h6>{t('dexmate_features.usedTechnologies')}</h6>
            <ul>
                <li>
                    <strong>AWS S3:</strong> {t('dexmate_features.awsS3Text')}.
                </li>
            </ul>
            <h4>{t('dexmate_features.emailSending')}</h4>
            <h6>{t('dexmate_features.usedTechnologies')}</h6>
            <ul>
                <li>
                    <strong>SendGrid:</strong> {t('dexmate_features.sendGridText')}.
                </li>
            </ul>
            <h4>IA</h4>
            <h6>{t('dexmate_features.usedTechnologies')}</h6>
            <ul>
                <li>
                    <strong>DeepL:</strong> {t('dexmate_features.deeplText')}.
                </li>
                <li>
                    <strong>GPT:</strong> {t('dexmate_features.gptText')}.
                </li>
                <li>
                    <strong>DALL-E:</strong> {t('dexmate_features.dalleText')}.
                </li>
            </ul>
            <h4>{t('dexmate_features.paymentPassing')}</h4>
            <h6>{t('dexmate_features.usedTechnologies')}</h6>
            <ul>
                <li>
                    <strong>Stripe:</strong> {t('dexmate_features.stripeText')}.
                </li>
            </ul>
            <h1>{t('dexmate_features.systemWorkflow')}</h1>
            <p>{t('dexmate_features.systemWorkflowText')}.</p>
            <p>{t('dexmate_features.systemWorkflowTitle')}:</p>
            <ul>
                <li>{t('dexmate_features.systemWorkflowStep1')}.</li>
                <li>{t('dexmate_features.systemWorkflowStep2')}.</li>
                <li>{t('dexmate_features.systemWorkflowStep3')}.</li>
                <li>{t('dexmate_features.systemWorkflowStep4')}.</li>
                <li>{t('dexmate_features.systemWorkflowStep5')}.</li>
                <li>{t('dexmate_features.systemWorkflowStep6')}.</li>
            </ul>
            <h2>{t('dexmate_features.lighthouseReport')}</h2>
            <p>{t('dexmate_features.lighthouseReportText')}:</p>
            <a
                href="https://pagespeed.web.dev/analysis/https-dexmate-shuntr-dev/ujof3lqkff?hl=es&form_factor=desktop"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    loading="lazy"
                    alt="PageSpeeds Insights"
                    src="https://dexmate-shop.s3.eu-west-3.amazonaws.com/PageSpeed.webp"
                />
            </a>
            <h2>{t('dexmate_features.referenceLinks')}: </h2>
            <a href="https://github.com/ShunTr-dev" target="_blank" rel="noreferrer">
                <img
                    alt="GitHub"
                    loading="lazy"
                    src="https://dexmate-shop.s3.eu-west-3.amazonaws.com/GitHub-features.webp"
                />
            </a>{' '}
            <a href="https://www.linkedin.com/in/pablo-martinez-developer/" target="_blank" rel="noreferrer">
                <img
                    loading="lazy"
                    alt="LinkedIn"
                    src="https://dexmate-shop.s3.eu-west-3.amazonaws.com/LinkedIn_icon-features.webp"
                />
            </a>
        </ContainerWrapper>
    );
};

export default DexmateFeatures;
