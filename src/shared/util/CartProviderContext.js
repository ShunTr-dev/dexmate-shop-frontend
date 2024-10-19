import { useReducer } from 'react';
import CartContext from '../context/cart-context';
import axios from 'axios';

let defaultCartState = JSON.parse(localStorage.getItem('cartProducts'));

if (!defaultCartState) {
    defaultCartState = {
        products: [],
        totalPrice: 0,
        totalElements: 0,
    };
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalPrice = state.totalPrice + action.product.price * action.product.quantity;
        const updatedTotalElements = state.totalElements + action.product.quantity;
        const existingCartProductIndex = state.products.findIndex((product) => product.id === action.product.id);
        const existingCartProduct = state.products[existingCartProductIndex];

        let updatedProducts;

        // Si existe el producto se añade X a la cantidad
        // Si no existe el producto se añade al array

        if (existingCartProduct) {
            const updatedProduct = {
                ...existingCartProduct,
                quantity: existingCartProduct.quantity + action.product.quantity,
            };
            updatedProducts = [...state.products];
            updatedProducts[existingCartProductIndex] = updatedProduct;
        } else {
            updatedProducts = state.products.concat(action.product); //Añade un elemento al array SIN meterlo en elemento original (como push)
        }

        const updatedCart = {
            products: updatedProducts,
            totalPrice: updatedTotalPrice,
            totalElements: updatedTotalElements,
        };

        localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

        if (JSON.parse(localStorage.getItem('userData'))) {
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/carts/update`, updatedCart);
            //console.log('Actualizando carrito en la nube');
        }
        return updatedCart;
    }

    if (action.type === 'REMOVE') {
        const existingCartProductIndex = state.products.findIndex((product) => product.id === action.id);
        const existingProduct = state.products[existingCartProductIndex];
        const updatedTotalPrice = state.totalPrice - existingProduct.price;
        const updatedTotalElements = state.totalElements - 1;

        let updatedProducts;
        if (existingProduct.quantity === 1) {
            updatedProducts = state.products.filter((product) => product.id !== action.id);
        } else {
            const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity - 1 };
            updatedProducts = [...state.products];
            updatedProducts[existingCartProductIndex] = updatedProduct;
        }

        const updatedCart = {
            products: updatedProducts,
            totalPrice: updatedTotalPrice,
            totalElements: updatedTotalElements,
        };

        localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
        if (JSON.parse(localStorage.getItem('userData'))) {
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/carts/update`, updatedCart);
            //console.log('Actualizando carrito en la nube');
        }
        return updatedCart;
    }

    if (action.type === 'REMOVE_FULL') {
        const existingCartProductIndex = state.products.findIndex((product) => product.id === action.id);
        const existingProduct = state.products[existingCartProductIndex];
        const updatedTotalPrice = state.totalPrice - existingProduct.price * existingProduct.quantity;
        const updatedTotalElements = state.totalElements - existingProduct.quantity;

        const updatedProducts = state.products.filter((product) => product.id !== action.id);

        const updatedCart = {
            products: updatedProducts,
            totalPrice: updatedTotalPrice,
            totalElements: updatedTotalElements,
        };

        localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
        if (JSON.parse(localStorage.getItem('userData'))) {
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/carts/update`, updatedCart);
            //console.log('Actualizando carrito en la nube');
        }
        return updatedCart;
    }

    if (action.type === 'CLEAR') {
        const updatedCart = {
            products: [],
            totalPrice: 0,
            totalElements: 0,
        };

        localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
        //axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/carts/update`, updatedCart);
        //console.log('Actualizando carrito en la nube');
        return updatedCart;
    }

    if (action.type === 'RELOAD') {
        const updatedCart = JSON.parse(localStorage.getItem('cartProducts'));
        return updatedCart;
    }

    return defaultCartState;
};

const CartProviderContext = (props) => {
    // Mirar de implantar el local storage con un state para que cambien los valores entre pestañas
    // https://gist.github.com/jimode/c1d2d4c1ab33ba1b7be8be8c50d64555

    // En use reducer recibe como parámetros:
    // - la función de reducer que tiene, con los estados
    // - El estado por defecto del elemento
    //
    // Se recibe
    // - El estado actual del elemento
    // - La funcion para llamar al reducer
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addProductToCartHandler = (product) => {
        dispatchCartAction({ type: 'ADD', product: product });
    };

    const removeProductFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const removeFullProductFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE_FULL', id: id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    };

    const reloadCartHandler = () => {
        dispatchCartAction({ type: 'RELOAD' });
    };

    const cartContext = {
        products: cartState.products,
        totalPrice: cartState.totalPrice,
        totalElements: cartState.totalElements,
        addProductToCart: addProductToCartHandler,
        removeProductToCart: removeProductFromCartHandler,
        removeFullProductToCart: removeFullProductFromCartHandler,
        clearCart: clearCartHandler,
        reloadCart: reloadCartHandler,
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProviderContext;
