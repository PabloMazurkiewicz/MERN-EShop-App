import axios from 'axios'
import { CART_ADD_ITEM,CART_REMOVE_ITEM } from '../constants/cartConstants'

//add to cart will take in id and qty which we get from url
//getstate allows you to get your entire state tree
//with like getstate . you can grab any of the state for example cart which is there in store
export const addToCart = (id,qty) => async(dispatch,getState) => {
        const { data } = await axios.get(`/api/products/${id}`)
        
        dispatch({
            type:CART_ADD_ITEM,
            payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
            } 
         } )

         localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch,getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}