import { CheckoutItemContainer, ImageContainer, Img, NameQuantityPrice, Quantity, Arrow, Value} from './checkout-item.styles.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart,
         removeItemFromCart,
         removeProductFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';



const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);


    const clearItemFromCart = () => dispatch(removeProductFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <NameQuantityPrice>
                {name} 
            </NameQuantityPrice>

        <Quantity>
            <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value> 
            <Arrow onClick={addItemHandler}>&#10095;</Arrow>
        </Quantity>
            <NameQuantityPrice>${price}</NameQuantityPrice>
            <div className='remove-button' onClick={clearItemFromCart}>&#10005;</div>
        </CheckoutItemContainer>
    )
};

export default CheckoutItem;