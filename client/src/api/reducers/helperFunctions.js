import { createSelector } from 'reselect';

export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    //si no se encuentra el item, se setea a todos los items elegidos con la cantidad: 1
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

export const clearItem = (cartItems, cartItemToRemove) => (
    cartItems.filter(item => (
        item.id !== cartItemToRemove.id
    ))
);

/**
 * Funcion que usa "searchValues", 
 * para buscar productos por el titulo.
 * @param {valores provenientes del store} allProdcuts 
 * @param {*valores ingresados por el usuario} searchValues 
 */
export const filterSearchCollections = (collections, searchValues) => {
    let collectionsToArray = Object.values(collections);
    let productList = [];
    let arrayAux = null;

    collectionsToArray.forEach(product => {

        arrayAux = product.items.filter((item, idx )=>{
            return (item.name.toLowerCase().indexOf(searchValues.toLowerCase()) !== -1) && idx < 5
        });

        if (arrayAux.length) {
            arrayAux.forEach(element =>{
                productList.push(element);
            })            
        }
    });
    
    return productList;
};

//--Selectors--------Se aplica en: "cart-icon", "cart-dropdown" , "header", etc

//1) tomo lo que voy a seleccionar del objeto "state"
const selectCart = state => state.cart;
const selectUser = state => state.user;
const selectDirectory = state => state.directory;
const selectShop = state => state.shop;
//2) createSelector(),1arg: array de input selectors. 
//2arg, funcion con lo que se quiere retornar del 1arg para que se haga "memoized"
export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartItems = createSelector(
    [selectCart], //redirige a const "selectCart"
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems], //referencia a la funcion  "selectCartItems"
    cartItems => cartItems.reduce(
        //reduce: funcion con dos parametro que obtiene un valor de un array. 1arg, callback. 2do, el valor inicial del acumulador.
        //1arg (callback), tiene tmb dos parametro. El primero es el acumulador y el segundo el primer elemento del array (dependiendo del 2do arg). 
        (accumulated, cartItem) => (
            accumulated + cartItem.quantity //operacion a hacer con los valores
        ),
        0
    )
);

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => (
            accumulatedQuantity + cartItem.quantity * cartItem.price //operacion a hacer con los valores
        ),
        0
    )
);

export const selectDirectorySections = createSelector(
    [selectDirectory],
    (directory) => directory.sections
);

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

/**
 * Funcion que recibe dos argumentos en dos funciones separadas: 
 * selectShopCollection(collectionUrlParam)(state)
 * state, se recibe en otro parentesis, porque se pasa a la segunda funcion: createSelector.
 * Se denomina "Curried Function" (*)
 * @param {1er arg, se le pasa a la primer funcion:selectShopCollection } collectionUrlParam 
 */
export const selectCollection = collectionUrlParam => {
    return (createSelector(
        [selectShopCollections],
        (collections) => (
            collections ? collections[collectionUrlParam] : null
        )
    ))
};

export const selectCollectionForPreview = createSelector(
    [selectShopCollections],
    (collections) => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    (shop) => shop.isFetching
);

/**
 * !!, doble negacion convierte un valor determinado en un "boolean"
 * , si no contiene ningun elemento da false. Ej !!0 ->false , !!1 ->true
 * Se usa en Main.js
 */
export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
);

export const selectCollectionsSearchValues = createSelector(
    [selectShop],
    (shop) => shop.collectionsSearchValues
);

