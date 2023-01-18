import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD7DT8ylYPtbjLJILlfUeLYi3Eqx20KzcY",
    authDomain: "crwn-clothing-db-7621c.firebaseapp.com",
    projectId: "crwn-clothing-db-7621c",
    storageBucket: "crwn-clothing-db-7621c.appspot.com",
    messagingSenderId: "484280269921",
    appId: "1:484280269921:web:8c4d7d044c4bca302dbe20"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth();

export const signOutUser = async () => await signOut(auth);

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email , password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email , password);
};

export const db = getFirestore();

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit(); // inaczej to jest dodanie do db tych objektow
    console.log('done');
};



export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title , items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoryMap;
};


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid); // Robie dokument tego uzytkownika
    const userSnapshot = await getDoc(userDocRef); // pobieram ten dokument i sprawdzam czy jest utworzony w db

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth; // Pobieram imie oraz email z obiektu user ktory jest przekazany jako argument
        const createdAt = new Date();  // Tworze nowa date kiedy uzytkownik sie zalogowal

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            }); 
        } catch(error) {
            console.log('error creating the user ', error.message);
        }
    }
    return userDocRef;
}