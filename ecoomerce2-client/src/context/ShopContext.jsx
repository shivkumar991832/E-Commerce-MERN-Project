import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

    const currency = '$';
    const delivery_fees = 10;
    // const backendURl = import.meta.env.VITE_BACKEND_URL
     const backendURL = 'http://localhost:5000'


    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const [token, setToken] = useState("")

    //state variable for geting all product data whenever admin added new products
     const [products, setProducts] = useState([])

    //navigation hook
    const navigate = useNavigate();


    // add to cart function
    const addToCart = async (itemId, size) => {
        
        //if user not selected sizes then show message
        if (!size) {
            toast.error('Please Select Product Size')
            return;
        }


        //object copy
        let cartData = structuredClone(cartItems)

        // Any Properties available with this itemId and size
        if(cartData[itemId]){
            if (cartData[itemId][size]) {
        //increase product entry by one
            cartData[itemId][size]++;
            
         } else{
        //when having product entry but dont have the same size
        //create new entry
            cartData[itemId][size] = 1;
         }
        }else {
            // if not have any entry
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        
        //if user logged in then we will save the cartItems in database
        if(token) {
            try {
                await axios.post(backendURL + '/api/cart/add', {itemId, size}, {
                    headers : {token}
                } )

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    //Created logic for get totalCount for added cart
    const getCartCount = () => {
        let totalCount = 0;
        //for in loop on cartItems
        for (const items in cartItems){
            //1st iterate the item
            for(const item in cartItems[items])
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
        }
        return totalCount;
    }

    //delelte or modify the cart item

    const updateQuantity = async(itemId , size , quantity) =>{
         //1st create copy of cartItem variable(object)
         let cartData = structuredClone(cartItems)
         cartData[itemId][size] = quantity;
         setCartItems(cartData);

         //update in database
         if (token) {
            try {
                await axios.post(backendURL + '/api/cart/update', {itemId , size , quantity}, {
                    headers : {token}
                })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
            
         }
    }



    //to get total cart amount

    const getCartAmount = () =>{
         let totalAmount = 0;
         // we will get product using itemId furture store in a variable
         for(const items in cartItems){
             let itemInfo = products.find((product)=>product._id === items) ; //items= _id
             //using above variable we can find the product price , can cal price bese on the qty
             for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
             }
         }

         return totalAmount;
    }
    const getProductsData = async () => {
        try {
            const response = await fetch(backendURL+'/api/product/list' , {
                method : "GET"
            } )

            const data = await response.json()
            console.log(data)
            
             if(data.success) {
                setProducts(data.listedProduct)
             }else {
                toast.error(data.message)
             }
 
        } catch (error) {
          toast.error(error.message)

        }
    }


    //function to get cart items from database(important)
    const getUserCartItems = async (token) => {
         try {
            const response = await axios.post(backendURL + '/api/cart/get', {} ,{
                headers : {token}
            })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
         } catch (error) {
            console.log(error)
            toast.error(error.message)
         }
    }


    useEffect(()=>{
        getProductsData()
    },[])


    useEffect(() => {
        //reload karne par logout nhi hoga(token remove nhi hoga)
        // we save the token in token variable and also in localStorage
       if (!token && localStorage.getItem('token') ) {
          setToken(localStorage.getItem('token'))

          //call the function to get cart items from database when page reload

          getUserCartItems(localStorage.getItem('token'))
       }
    }, [])
    



    //when cartItem will be modify
    // useEffect(() => {
    //     console.log(cartItems)
    // //    addToCart()
    // }, [cartItems])
    


    const value = {
          products, currency, delivery_fees, search, setSearch, showSearch, setShowSearch, addToCart, cartItems, setCartItems, getCartCount, updateQuantity, getCartAmount,
          navigate, backendURL, token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
      {/* wrapped children components */}

            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider