export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state, // Means je available states ahet adhi pasunchya tya ghya kadhun

                // newCartState = all available carts + newly added cart as lihely khali 
                // jar apan "...state.cart" chya jagi apan jar "state.cart" as lihil tar apan dusr product add kel ki pahil product automatically remove hot.

                // "...state.cart" means cart madhlya saglya value

                // cart: [...state.cart, action.payload] means cart navachya array maddhe adhichya cart maddhe ajun ek cart add kara. To new card action.payload mdhun yetoy

                cart: [...state.cart, { ...action.payload, qty: 1 }]
            };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                // newCartState = all available carts - removed items as lihely khali 
                // c.id !== action.payload.id means mi click kelelya product chi id ani cart mdhe aslelya product chi id jar "MATCH ZALI" tar to product remove honar.
                cart: [...state.cart.filter((c) => c.id !== action.payload.id)]
            };

        case "CHANGE_CART_QTY":
            return {
                // It means jar mi click kelelya product chi id ani cart madhlya product chi id jar match zali tar tya product chi quantity vadhel.
                ...state,
                cart: state.cart.filter(c => c.id === action.payload.id ? c.qty = action.payload.qty : c.qty)
            }

        default:
            return state;
    }
}


export const productReducer = (state, action) => {
    switch (action.type) {
        case 'SORT_BY_PRICE':
            // We can add new states in reducer also as we have added sort state below:
            return { ...state, sort: action.payload }

        case 'FILTER_BY_STOCK':
            return { ...state, byStock: !state.byStock }

        case 'FILTER_BY_DELIVERY':
            return { ...state, byFastDelivery: !state.byFastDelivery }

        case 'FILTER_BY_RATING':
            return { ...state, byRating: action.payload }

        case 'FILTER_BY_SEARCH':
            return { ...state, searchQuery: action.payload }

        case 'CLEAR_FILTERS':
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: ""
            }

        default:
            return state;
    }
};
