import React from 'react';

import { useTranslation } from 'react-i18next';

const InvoicesItems = (props) => {
    const { i18n } = useTranslation();

    return (
        <tr>
            <td className="cart-product-description">
                <strong>
                    <span>{props.title[0][i18n.resolvedLanguage]}</span>
                </strong>
            </td>
            <td className="cart-product-price">
                <span className="amount">
                    {props.price} {process.env.REACT_APP_CURRENCY}
                </span>
            </td>
            <td className="cart-product-quantity">{props.quantity}</td>
            <td className="cart-product-subtotal">
                <span className="amount">
                    {props.price * props.quantity} {process.env.REACT_APP_CURRENCY}
                </span>
            </td>
        </tr>
    );
};

export default InvoicesItems;
