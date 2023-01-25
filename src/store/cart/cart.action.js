import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }
    // return new array with modified cartItems / new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
}; 

const removeFromCart = (cartItems, productToRemove) => {
    const exsistingCartItem = cartItems.find((item) => item.id === productToRemove.id);

    if(exsistingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id); // Usuwam exsistingCarItem  poniewaz quantity jego wynosi 1 wiec jezeli pomniejsze to bedzie zero czyli nie istnieje , wiec zwracam produkty ktore nie maja tego samego id
    }

    // Jezeli nie jest rowny 1 to zwracamy obiekt ze zmniejszona iloscia 
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
    
};

const removeIt = (cartItems, itemToRemove) => {
    const exsisting = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

    if(exsisting) {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }
}


export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeFromCart(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeProductFromCart = (cartItems, itemToRemove) => {
    const newCartItems = removeIt(cartItems, itemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


