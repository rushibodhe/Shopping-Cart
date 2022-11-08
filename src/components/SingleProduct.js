import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { CartState } from '../context/Context';
import Rating from './Rating'

const SingleProduct = ({ prod }) => {

    const { state: { cart }, dispatch } = CartState();

    return (
        <div className='products'>
            <Card>
                <Card.Img variant="top" src={prod.image} alt={prod.name} />
                <Card.Body>
                    <Card.Title>{prod.name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span> Rs {prod.price.split(".")[0]}</span>
                        {prod.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) :
                            (
                                <div>4 days delivery</div>
                            )}
                        <Rating rating={prod.ratings} />
                    </Card.Subtitle>
                    {
                        // means jar cart maddhe kont product asel tarch remove ch button dakhvl jail
                        cart.some((p) => p.id === prod.id) ?
                            (<Button variant="danger" onClick={() => {
                                dispatch({
                                    type: 'REMOVE_FROM_CART',
                                    payload: prod,
                                })
                            }}>
                                Remove from Cart
                            </Button>) :
                            (<Button disabled={!prod.inStock} onClick={() => {
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: prod,
                                })
                            }}>
                                {!prod.inStock ? "Out of stock" : "Add to Cart"}
                            </Button>)
                    }


                </Card.Body>
            </Card>
        </div >
    )
}

export default SingleProduct