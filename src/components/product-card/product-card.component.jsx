import {Price, Name, Footer, Img, ProductCardContainer} from './product-card.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <Img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add To Card</Button>
        </ProductCardContainer>
    )
};

export default ProductCard;