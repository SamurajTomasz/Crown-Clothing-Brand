import { CartDropDownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context'
import { Link, useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(item => <CartItem key={item.id} cartItem={item}/>))
                        : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            {/* <Link to='/checkout'>
                <Button>Go To Checkout</Button>
            </Link>   PIERWSZY SPOSOB LUB PONIZEJ DRUGI SPOSOB*/}
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
        </CartDropDownContainer>
    )
};

export default CartDropdown;