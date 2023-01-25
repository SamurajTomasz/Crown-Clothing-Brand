// import { createContext, useState, useEffect, useReducer } from "react";
// import {createAction} from '../utils/reducer/reducer.utils'


// const addCartItem = (cartItems, productToAdd) => {
//     const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

//     if(existingCartItem) {
//         return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
//             {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
//     }
//     // return new array with modified cartItems / new cart item
//     return [...cartItems, {...productToAdd, quantity: 1}];
// }; 

// const removeFromCart = (cartItems, productToRemove) => {
//     const exsistingCartItem = cartItems.find((item) => item.id === productToRemove.id);

//     if(exsistingCartItem.quantity === 1) {
//         return cartItems.filter(cartItem => cartItem.id !== productToRemove.id); // Usuwam exsistingCarItem  poniewaz quantity jego wynosi 1 wiec jezeli pomniejsze to bedzie zero czyli nie istnieje , wiec zwracam produkty ktore nie maja tego samego id
//     }

//     // Jezeli nie jest rowny 1 to zwracamy obiekt ze zmniejszona iloscia 
//     return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? 
//         {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
    
// };

// const removeIt = (cartItems, itemToRemove) => {
//     const exsisting = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

//     if(exsisting) {
//         return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
//     }
// }

// export const CartContext = createContext({
//     isCartOpen: false,
//     setIsCartOpen: () => {}, // ustawienie na funkcje !! => null ustawienie na pusty obiekt => [] ustawienie na pusta tablice
//     cartItems: [],
//     addItemToCart: () => {},
//     removeItemFromCart: () => {},
//     removeProductFromCart: () => {},
//     cartCount: 0,
//     cartTotal: 0
// });

// const CART_ACTION_TYPES = {
//     SET_CART_ITEMS: "SET_CART_ITEMS",
//     SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
// }

// const INITIAL_STATE = {
//     isCartOpen: false,
//     cartItems: [],
//     cartCount: 0,
//     cartTotal: 0
// }

// const cartReducer = (state, action) => {
//     const { type, payload } = action;

//     switch(type) {
//         case CART_ACTION_TYPES.SET_CART_ITEMS:
//             return {
//                 ...state,
//                 ...payload
//             }
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return {
//                 ...state,
//                 isCartOpen: payload
//             }
//         default: 
//             throw new Error(`Unhandle type of ${type} in cartReducer`);
//     }
// }



// export const CartProvider = ({children}) => {
//     // const [isCartOpen, setIsCartOpen] = useState(false);
//     // const [cartItems, setCartItems] = useState([]);
//     // const [cartCount, setCartCount] = useState(0);
//     // const [cartTotal, setCartTotal] = useState(0);

//     // useEffect(() => {
//         //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity ,0);
//         //     setCartCount(newCartCount);
//         // }, [cartItems]);
    
//         // useEffect(() => {
//             //     const newCartTotalValue = cartItems.reduce((total, cartItem) =>  total + cartItem.price * cartItem.quantity, 0);
//             //     setCartTotal(newCartTotalValue);
//             // },[cartItems]);


            
//     const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

//     const updateCartItemsReducer = (newCartItems) => {
//         const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
//         const newCartTotal = newCartItems.reduce((total ,cartItem) => total + cartItem.price * cartItem.quantity, 0);
        
//         dispatch(
//             createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
//                 cartItems: newCartItems, 
//                 cartTotal: newCartTotal, 
//                 cartCount: newCartCount
//             })
//         );
//     }

//     const addItemToCart = (productToAdd) => {
//         const newCartItems = addCartItem(cartItems, productToAdd);
//         updateCartItemsReducer(newCartItems);
//     };

//     const removeItemFromCart = (cartItemToRemove) => {
//         const newCartItems = removeFromCart(cartItems, cartItemToRemove);
//         updateCartItemsReducer(newCartItems);
//     }

//     const removeProductFromCart = (itemToRemove) => {
//         const newCartItems = removeIt(cartItems, itemToRemove);
//         updateCartItemsReducer(newCartItems);
//     }

//     const setIsCartOpen = (bool) => {
//         dispatch(
//             createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool) // tu bylo {bool} otwieranie karty
//         );
//     }

//     const value = { isCartOpen,
//                     setIsCartOpen, 
//                     cartItems, 
//                     addItemToCart, 
//                     removeItemFromCart, 
//                     removeProductFromCart, 
//                     cartCount, 
//                     cartTotal};


//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// };