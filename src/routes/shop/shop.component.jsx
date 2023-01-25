import { Routes, Route } from 'react-router';
import { useEffect } from 'react';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
// import { fetchCategoriesAsync } from '../../store/categories/categories.action'; TO BYLO GDY BYLO REDUX-THUNK
import { fetchCategoriesStart } from '../../store/categories/categories.action';
import { useDispatch } from 'react-redux';

import './shop.styles.scss';
import { connectFirestoreEmulator } from 'firebase/firestore';

const Shop = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
    //   dispatch(fetchCategoriesAsync()); TO BYLO GDY BYLO REDUX-THUNK
    dispatch(fetchCategoriesStart());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} /> 
            {/* Poprzez useParams ustawiamy :category , ustawiamy w pliku category.component */}
        </Routes>
    )
};

export default Shop;