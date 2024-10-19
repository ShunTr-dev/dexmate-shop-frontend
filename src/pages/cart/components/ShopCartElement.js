import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../../../shared/context/cart-context';
import { useTranslation } from 'react-i18next';

const ShopCartElement = (props) => {
    const { i18n } = useTranslation();
    const cartCtx = useContext(CartContext);

    const [quantity, setQuantity] = useState(props.quantity);

    const deductQuantityHandler = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            cartCtx.removeProductToCart(props.id);
        }
    };

    const addQuantityHandler = () => {
        setQuantity(quantity + 1);

        cartCtx.addProductToCart({
            id: props.id,
            title: props.title,
            images: props.images,
            price: props.price,
            category: props.category,
            quantity: 1,
        });
    };

    const deleteProductHandler = () => {
        cartCtx.removeFullProductToCart(props.id);
    };

    return (
        <tr>
            <td className="cart-product-remove">
                <span onClick={deleteProductHandler}>
                    <i className="fa fa-times"></i>
                </span>
            </td>
            <td className="cart-product-thumbnail">
                <Link to={`/products/${props.id}`}>
                    <img
                        loading="lazy"
                        src={process.env.REACT_APP_AWS_S3_URL_BASE + props.images[0]}
                        width="380"
                        height="507"
                        alt={props.title[0][i18n.resolvedLanguage]}
                    />
                </Link>
                <div className="cart-product-thumbnail-name">{props.title[0][i18n.resolvedLanguage]}</div>
            </td>
            <td className="cart-product-description">
                <p>
                    <span>{props.title[0][i18n.resolvedLanguage]}</span>
                    <span>
                        {props.category.length > 0 &&
                            props.category[0]['name'] !== undefined &&
                            props.category[0]['name'][0][i18n.resolvedLanguage]}
                    </span>
                </p>
            </td>
            <td className="cart-product-price">
                <span className="amount">
                    {props.price} {process.env.REACT_APP_CURRENCY}
                </span>
            </td>
            <td className="cart-product-quantity">
                <div className="quantity">
                    <input type="button" className="minus" value="-" onClick={deductQuantityHandler} />
                    <input type="text" className="qty" value={quantity} name="quantity" readOnly={true} />
                    <input type="button" className="plus" value="+" onClick={addQuantityHandler} />
                </div>
            </td>
            <td className="cart-product-subtotal">
                <span className="amount">
                    {props.price * props.quantity} {process.env.REACT_APP_CURRENCY}
                </span>
            </td>
        </tr>
    );
};

export default ShopCartElement;
