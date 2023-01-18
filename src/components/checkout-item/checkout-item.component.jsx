import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CheckoutItemContainer, ImageContainer, Img, NameQuantityPrice, Quantity, Arrow, Value} from './checkout-item.styles.jsx';


const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { removeProductFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    const clearItemFromCart = () => removeProductFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
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