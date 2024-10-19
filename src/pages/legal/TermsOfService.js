import { useTranslation } from 'react-i18next';
import ContainerWrapper from '../../shared/components/UIElements/ContainerWrapper';

const TermsOfService = () => {
    const { t } = useTranslation();

    return (
        <ContainerWrapper title={t('navigation.termsOfService')}>
            <h1>Terms and Conditions for the {process.env.REACT_APP_SHOP_NAME} Shop</h1>
            <p>Last Updated: 2023/07/22</p>
            <p>
                Welcome to the {process.env.REACT_APP_SHOP_NAME} Shop website (&quot;Website&quot;). The following terms
                and conditions (&quot;Terms&quot;) govern your use of the Website and the purchase of products offered
                on the Website. By accessing and using the Website, you agree to be bound by these Terms. Please read
                them carefully before making any purchase. If you do not agree with these Terms, you should not use the
                Website.
            </p>

            <h2>General Terms:</h2>
            <p>
                1.1. The {process.env.REACT_APP_SHOP_NAME} Shop is an showcase project that simulates an online platform
                that allows users to browse and purchase various products showcased on the Website. But is NOT a REAL
                shop
            </p>
            <p>
                1.2. By accessing the Website, you affirm that you are at least 18 years old or have the necessary legal
                consent from a parent or guardian.
            </p>
            <p>
                1.3. The {process.env.REACT_APP_SHOP_NAME} Shop reserves the right to modify or update these Terms at
                any time without prior notice. Your continued use of the Website after any changes constitutes your
                acceptance of the revised Terms.
            </p>

            <h2>Product Information:</h2>
            <p>
                2.1. The {process.env.REACT_APP_SHOP_NAME} Shop strives to provide accurate product descriptions and
                images. However, we do not warrant that product descriptions or any other content on the Website is
                complete, reliable, current, or error-free.
            </p>
            <p>
                2.2. The images of products on the Website are for illustrative purposes only. We DONT sell ANYTHING.
                This is only a showcase.
            </p>
            <p>
                2.3. All products on the Website are imaginary. The {process.env.REACT_APP_SHOP_NAME} Shop never will
                sell you anithing.
            </p>

            <h2>Orders and Payments:</h2>
            <p>
                3.1. To place an order, you must provide accurate and complete information during the checkout process.
            </p>
            <p>
                3.2. By placing an order, you make an offer to purchase the products listed in your order. All orders
                are subject to acceptance by the {process.env.REACT_APP_SHOP_NAME} Shop.
            </p>
            <p>
                3.3. The {process.env.REACT_APP_SHOP_NAME} Shop accepts payment through approved payment methods as
                indicated on the Website. Payment must be made in full before the order is processed.
            </p>
            <p>
                3.4. Prices for products are displayed on the Website and are subject to change without notice. The{' '}
                {process.env.REACT_APP_SHOP_NAME} Shop is not responsible for typographical errors regarding product
                pricing.
            </p>

            <h2>Shipping and Delivery:</h2>
            <p>4.1. You will ever receive a delivery from this web.</p>

            <h2>Returns and Refunds:</h2>
            <p>
                5.1. The Returns and Refunds Policy of the {process.env.REACT_APP_SHOP_NAME} Shop governs the process
                for returning products and obtaining refunds, and it is incorporated into these Terms.
            </p>
            <p>5.2. You cant return anything.</p>

            <h2>Intellectual Property:</h2>
            <p>
                6.1. All content on the Website, including product images, designs, logos, and trademarks, are the
                intellectual property of the {process.env.REACT_APP_SHOP_NAME} Shop and its licensors.
            </p>
            <p>
                6.2. You may not reproduce, distribute, modify, display, or use any content from the Website without the
                prior written consent of the {process.env.REACT_APP_SHOP_NAME} Shop.
            </p>

            <h2>Indemnification:</h2>
            <p>
                7.1. You agree to indemnify and hold the {process.env.REACT_APP_SHOP_NAME} Shop, its affiliates,
                officers, employees, and agents harmless from any claims, liabilities, damages, and expenses arising
                from your use of the Website or any violation of these Terms.
            </p>

            <h2>Limitation of Liability:</h2>
            <p>
                8.1. The {process.env.REACT_APP_SHOP_NAME} Shop shall not be liable for any direct, indirect,
                incidental, consequential, or special damages arising out of or in connection with your use of the
                Website or the purchase of products, even if we have been advised of the possibility of such damages.
            </p>

            <h2>Governing Law:</h2>
            <p>
                9.1. These Terms shall be governed by and construed in accordance with the laws of Spain, without regard
                to its conflict of laws principles.
            </p>

            <p>
                By using the {process.env.REACT_APP_SHOP_NAME} Shop Website, you acknowledge that you have read,
                understood, and agreed to these Terms and Conditions. Thank you for visiting our Website and happy
                shopping!
            </p>
        </ContainerWrapper>
    );
};

export default TermsOfService;
