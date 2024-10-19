import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../shared/components/UIElements/ContainerWrapper';

const CookiePolicy = () => {
    const { t } = useTranslation();

    return (
        <ContainerWrapper title={t('navigation.cookiePolicy')}>
            <h1>Cookies Policy for the {process.env.REACT_APP_SHOP_NAME} Shop</h1>
            <p>Last Updated: 2023/07/22</p>
            <p>
                This Cookies Policy (&quot;Policy&quot;) explains how the {process.env.REACT_APP_SHOP_NAME} Shop
                (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar tracking technologies when
                you visit our website (&quot;Website&quot;). By accessing and using the Website, you consent to the use
                of cookies as described in this Policy.
            </p>

            <h2>What are Cookies?</h2>
            <p>
                1.1. Cookies are small text files that are stored on your device (computer, tablet, smartphone, etc.)
                when you visit a website. They help the website recognize your device and remember certain information
                about your visit, such as your preferences and actions.
            </p>
            <p>
                1.2. There are different types of cookies, including session cookies (which are temporary and are
                deleted when you close your browser) and persistent cookies (which remain on your device for a specified
                period or until you delete them).
            </p>

            <h2>How We Use Cookies</h2>
            <p>
                2.1. The {process.env.REACT_APP_SHOP_NAME} Shop uses cookies for various purposes, including but not
                limited to:
            </p>
            <ul>
                <li>a. Providing a smooth and personalized browsing experience on our Website.</li>
                <li>b. Analyzing how users interact with the Website and improving its performance.</li>
                <li>c. Remembering your preferences and settings to enhance your user experience.</li>
                <li>d. Facilitating the process of adding products to your shopping cart and completing purchases.</li>
            </ul>
            <p>2.2. We may use both session and persistent cookies to achieve these objectives.</p>

            <h2>Third-Party Cookies</h2>
            <p>
                3.1. The {process.env.REACT_APP_SHOP_NAME} Shop may allow certain third-party service providers to set
                cookies on our Website. These third parties may include analytics providers, advertising networks, and
                social media platforms.
            </p>
            <p>
                3.2. These third-party cookies are governed by the respective privacy and cookies policies of the
                providers and not by this Policy. We encourage you to review the privacy and cookies policies of these
                third parties to understand their practices.
            </p>

            <h2>Your Cookie Choices</h2>
            <p>
                4.1. You have the option to control the use of cookies on the {process.env.REACT_APP_SHOP_NAME} Shop
                Website. Most web browsers automatically accept cookies, but you can usually modify your browser
                settings to decline cookies or receive a notification when cookies are being sent.
            </p>
            <p>
                4.2. Please note that blocking or deleting cookies may impact your user experience and limit certain
                functionalities of the Website.
            </p>

            <h2>Consent</h2>
            <p>
                5.1. By continuing to use the {process.env.REACT_APP_SHOP_NAME} Shop Website, you consent to the use of
                cookies in accordance with this Policy. If you do not agree to the use of cookies, please discontinue
                using the Website.
            </p>

            <h2>Changes to this Policy</h2>
            <p>
                6.1. The {process.env.REACT_APP_SHOP_NAME} Shop reserves the right to update or change this Cookies
                Policy at any time. Any changes to the Policy will be effective when the revised version is posted on
                the Website.
            </p>
        </ContainerWrapper>
    );
};

export default CookiePolicy;
