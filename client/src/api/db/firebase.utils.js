import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDW8xOHjSoVvSd_FI5TG5wATzzyFMWr3dc",
    authDomain: "e-commerce-db-78910.firebaseapp.com",
    databaseURL: "https://e-commerce-db-78910.firebaseio.com",
    projectId: "e-commerce-db-78910",
    storageBucket: "",
    messagingSenderId: "891460981274",
    appId: "1:891460981274:web:850170e16ef3e5239937a3",
    measurementId: "G-Q7KS073D79"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

/**
 * Funcion para subir archivos a la base de datos. (*nota backend)
 * @param {*id que sera el nombre de la collection} collectionKey 
 * @param {*} objectsToAdd 
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch(); //batch, permite agrupar varios pedidos 
    //en vez de enviar un set por cada elemento a la base de datos.
    objectsToAdd.forEach(element => {
        const newDocRef = collectionRef.doc();//genera snapShot con un nuevo documento con un id
        batch.set(newDocRef, element);
    });
    return await batch.commit(); //genera una promesa y devuelve si lo pudo o no subir a la base de datos.
}

/**
 * Funcion que descarga datos de la base de datos.
 * @param {*} collections 
 */
export const convertCollectionsSnapshotToMap = (collections) => {
    const transeformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        //add campos a cada documento
        return {
            routeName: encodeURI(title.toLowerCase()), //encodeURI, metodo de js que pasa un string a url
            id: doc.id,
            title,
            items
        }
    });
    //normaliza el array a JSON (por esto el "{}", como segundo parametro)
    return transeformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}
/**
 * Imitacion o "mimicking", de lo que seria una funcion general
 * que sirva para cualquier backend
 */
export const getCurrentUser=() =>{
    return new Promise((resolve,reject)=>{
        const unSubscribe = auth.onAuthStateChanged(userAuth=>{
            unSubscribe(); ///?????
            resolve(userAuth);
        },reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore(); //almacenamiento de valores 

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;