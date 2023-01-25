import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}, // ustawienie na funkcje !! => null ustawienie na pusty obiekt => [] ustawienie na pusta tablice
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    removeProductFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity ,0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotalValue = cartItems.reduce((total, cartItem) =>  total + cartItem.price * cartItem.quantity, 0);
        setCartTotal(newCartTotalValue);
    },[cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeFromCart(cartItems, cartItemToRemove));
    }

    const removeProductFromCart = (itemToRemove) => {
        setCartItems(removeIt(cartItems, itemToRemove));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, removeProductFromCart, cartCount, cartTotal};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};