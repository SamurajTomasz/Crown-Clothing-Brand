import { useState, useEffect, Fragment} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';
import ProductCard from '../../components/product-card/product-card.component';
import {CategoryTitle, CategoryContainer} from './category.styles';
import Spinner from '../../components/spinner/spinner.component';


const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [ products, setProducts ] = useState(categoriesMap[category]);
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    setProducts(categoriesMap[category]); // wtedy wykorzystujemy category do ustawienia prodoktow ktore wyswietla sie na stronie
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {
        isLoading ? (<Spinner />) : (<CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          )
          )}
        </CategoryContainer>)
      }
    </Fragment>
  )
};

export default Category;