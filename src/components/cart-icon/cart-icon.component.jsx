import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import  {CartIconContainer, ShoppingIconClass, ItemCount} from './cart-icon.styles.jsx';

const CartIcon = () => {

    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);


    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
        // Lub toggleIsCartOpen = () => setIsCartOpen(!iscartOpen); na to samo wychodzi co wyzej
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconClass/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
};

export default CartIcon;