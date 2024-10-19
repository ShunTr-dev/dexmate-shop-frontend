import { createContext } from 'react';

const CartContext = createContext({
    products: [],
    totalElements: 0,
    totalPrice: 0,
    addProductToCart: (product) => {},
    removeProductToCart: (id) => {},
    removeFullProductToCart: (id) => {},
    clearCart: () => {},
    reloadCart: () => {},
});

export default CartContext;
