import React from 'react';
import { CartState } from '../context/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import './Styles.css'

const Home = () => {
  // Desturcturing products from the state.
  const { state: { products }, productState: { byStock, byFastDelivery, sort, byRating, searchQuery } } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;


    /*
      If the return value of the compare function is greater than 0, then sort b before a.
      If the return value of the compare function is less than 0, then sort a before b.
      If the return value of the compare function is equal to 0, keep the original order of a and b.
    */


    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "LowToHigh" ? a.price - b.price : b.price - a.price,
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating)
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  };

  return (
    <div className='home'>
      <Filters />

      <div className="productContainer">
        {
          transformProducts().map((prod) => (
            <SingleProduct prod={prod} key={prod.id} />
          ))
        }
      </div>
    </div>
  )
}

export default Home