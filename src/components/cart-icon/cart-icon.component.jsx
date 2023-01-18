import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import  {CartIconContainer, ShoppingIconClass, ItemCount} from './cart-icon.styles.jsx';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    const { cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => {
        isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true);
        // Lub toggleIsCartOpen = () => setIsCartOpen(!iscartOpen); na to samo wychodzi co wyzej
    }
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconClass/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
};

export default CartIcon;