import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase.utils';

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // } ,[]); // uzywamy tylko raz ze wzgledu na to iz za kazdym razem bedzie chcial/probowal dodac kolekcje , a nam jest tylko to raz potrzebne ze wzgledu na odpalenie programu w celu proby


    useEffect(() => {
        const getCategories = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategories();
    }, []);

    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}