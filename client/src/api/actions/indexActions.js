import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import {
    TOGGLE_MENU_HIDDEN,
    TOGGLE_MENU_HIDDEN_TRUE,
    ADD_ITEM,
    CLEAR_ITEM_FROM_CART,
    REMOVE_ITEM,
    FETCH_COLLECTIONS_START,
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAILURE,
    GOOGLE_SIGN_IN_START,
    EMAIL_SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    CHECK_USER_SESSION,
    SIGN_OUT_START,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_FAILURE,
    CLEAR_CART,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SET_CART_FROM_FIREBASE,
    SEARCH_VALUE,
    SHOW_TEXT,
    INIT_POINT,
    SET_DETAIL_ITEM
    // UPDATE_CART_IN_FIREBASE
} from './typeActions';
import {
    firestore,
    convertCollectionsSnapshotToMap,
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser,
    getUserCartRef,
} from '../../api/db/firebase.utils';
import { selectCartItems, selectCurrentUser } from '../reducers/helperFunctions';

export const toggleMenuHidden = () => {
    return ({
        type: TOGGLE_MENU_HIDDEN
    });
};

export const toggleMenuHiddenToTrue = () => {
    return ({
        type: TOGGLE_MENU_HIDDEN_TRUE
    });
};

export const showText=()=>({
    type: SHOW_TEXT
})

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

export const clearItemFromCart = item => ({
    type: CLEAR_ITEM_FROM_CART,
    payload: item
});

export const removeItem = item => ({
    type: REMOVE_ITEM,
    payload: item
});

export const googleSignInStart = () => ({
    type: GOOGLE_SIGN_IN_START
});

export const signInSuccess = (user) => ({
    type: SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = (emailAndPassword) => ({
    type: EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});
//Funcion que chequea si el usuario cerro o no la sesion
export const checkUserSession = () => ({
    type: CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
    type: SIGN_OUT_FAILURE,
    payload: error
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const signUpStart = (userCredentials) => ({
    type: SIGN_UP_START,
    payload: userCredentials
});

export const signUpSuccess = ({ user, additionalData }) => ({
    type: SIGN_UP_SUCCESS,
    payload: { user, additionalData }
});

export const signUpFailure = (error) => ({
    type: SIGN_UP_FAILURE,
    payload: error
});

export const searchValue=(value)=>({
    type: SEARCH_VALUE,
    payload: value
})

export const fetchCollectionsStart = () => ({
    type: FETCH_COLLECTIONS_START
});

// export const updateCartInFirebase = () => ({
//     type: UPDATE_CART_IN_FIREBASE
// });

export const setCartFromFirebase = cartItems => ({
    type: SET_CART_FROM_FIREBASE,
    payload: cartItems
});

export const setDetailItem= item =>({
    type: SET_DETAIL_ITEM,
    payload: item
});

//initPoint: Mercado Pago 
export const setInitPoint = (initPoint) =>({
    type: INIT_POINT,
    payload:initPoint
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});



//-------Fetch con Thunk-------------------
export const fetchCollectionsStartAsync = () => dispatch => {
    const collectionRef = firestore.collection('collections');
    //Por que dispatch, en vez de llamar a la funcion directamente
    //dispatch, proviene de "redux-thunk" (* nota)
    dispatch(fetchCollectionsStart());

    collectionRef.get().then(snapShot => {
        const collectionMap = convertCollectionsSnapshotToMap(snapShot);
        dispatch(fetchCollectionsSuccess(collectionMap));
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));

    //---Patrones para peticiones: Observer Pattern y Promise Pattern -----
    //obtengo en formato JSON los datos de la base de datos.
    //Patron de diseño: Observer Pattern
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot => {
    //     const collectionMap = convertCollectionsSnapshotToMap(snapShot);
    //     updateCollections(collectionMap);
    //     setLoading(false);
    // });
    //Misma funcion que la anterior
    //Patron de diseño: Promise Pattern
    // collectionRef.get().then(snapShot => {
    //     const collectionMap = convertCollectionsSnapshotToMap(snapShot);
    //     updateCollections(collectionMap);
    //     setLoading(false);
    // });
};

//-----------------------Fetch con Saga-------------------------------------------//
//Funciones generator=> function*

export function* fetchCollectionsAsyncSaga() {

    try {
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get();
        //call, es como el then, ya que devuelve una promesa. 
        //  1er arg, es una funcion y los demas los parametros que se le van a pasar a esa funcion
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot);
        //put, es como el dispatch en thunk
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStartSaga() { //esta funcion se pasa al "store"
    yield takeLatest(
        FETCH_COLLECTIONS_START, //toma este string al ser activada "fetchCollectionsStart"
        fetchCollectionsAsyncSaga
    );
}

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try { //se conserva el try/catch (en vez de usar los de "getSnapshotFromUserAuth" ), ya que cada vez que se hace una peticion a la API, debe tener uno.
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            return; //si no hay usuario, se finaliza la funcion try
        }
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
        yield put(clearCart());
    } catch (error) {
        yield put(signOutFailure(error.message));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error.message));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* checkCartFromFirebase({ payload: user }) {
    const cartRef = yield getUserCartRef(user.id);
    const cartSnapshot = yield cartRef.get();
    yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* updateCartInFirebase() {
    const currentUser = yield select(selectCurrentUser);
    if (currentUser) {
        try {
            const cartRef = yield getUserCartRef(currentUser.id);
            const cartItems = yield select(selectCartItems);
            yield cartRef.update({ cartItems });
        } catch (error) {
            console.log(error);
        }
    }
    else{
        console.log("debe logearse el usuario para poder comprar");
        yield put(showText());
        // invocar una actions para que suba al store el error -> componente "debe logearse"
    }
}

//Nota: el prefijo "on", 
//indica que son las primeras funciones de saga y que van a desencadenar otras funciones de saga
export function* onEmailSignInStart() {
    yield takeLatest(
        EMAIL_SIGN_IN_START,
        signInWithEmail
    );
}

export function* onGoogleSignInStart() {
    yield takeLatest(
        GOOGLE_SIGN_IN_START,
        signInWithGoogle
    );
}
//Persistencia de sesion: Funcion que chequea si el usuario cerro o no la sesion.
export function* onCheckUserSession() {
    yield takeLatest(
        CHECK_USER_SESSION,
        isUserAuthenticated
    );
}

export function* onSignOutStart() {
    yield takeLatest(
        SIGN_OUT_START,
        signOut
    );
}

export function* onSignUpStart() {
    yield takeLatest(
        SIGN_UP_START,
        signUp
    );
}

//esta funcion se hace para conectar con la funcion saga "signInAfterSignUp".
//y poder usar "SIGN_IN_SUCCESS"
export function* onSignUpSuccess() {
    yield takeLatest(
        SIGN_UP_SUCCESS,
        signInAfterSignUp
    );
}

/**
 * chequea el carro de compras desde firebase
 */
export function* onUserSignIn() {
    yield takeLatest(SIGN_IN_SUCCESS, checkCartFromFirebase);
}

/**
 * Funcion para subir el carro de compras a firebase
 */
export function* onCartChange() {
    yield takeLatest(
        [
            ADD_ITEM,
            REMOVE_ITEM,
            CLEAR_ITEM_FROM_CART
        ],
        updateCartInFirebase
    );
}

/**
 * funcion que une todos los sagas del action,
 * para luego pasarlos al store
 */
export function* rootSaga() {
    yield all([
        call(fetchCollectionsStartSaga),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onUserSignIn),
        call(onCartChange)
    ]);
}
//-------------------------------------------------------------------------------//


