import { createContext, useContext, useReducer } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducers';

// Cart is the context
const Cart = createContext();

faker.seed(99); // Limiting the number of products shown so that it can be added to the cart

const Context = ({ children }) => {

  // Generating fake data:
  // [...Array(20)] means create undefined array of length 20 
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.fashion(),
    inStock: faker.datatype.number({ min: 0, max: 5 }),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.numeric([1, 2, 3, 4, 5])
  }));

  // // Initializing useReducer hook for cartReducer:
  // It means state and dispatch useReducer madhun ghe ani cartReducer navachya reducer la send kar. 
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  })

  // Initializing useReducer hook for productReducer:
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: ""
  }
  )
  // Providing context to the <App /> component using {children} prop:
  return (
    // Also passing state and actions to context:
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  )
}
export default Context  // Exporting context


// Exporting "useContext" hook as a CartState:
export const CartState = () => {
  return useContext(Cart)
}