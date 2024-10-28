import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const ViewOrderDetails = () => {
    const params = useParams()
    console.log(params)

    const firebase = useFirebase()
    const [orders,setOrders] = useState([])

    useEffect(()=>{
        firebase.getOrders(params.bookId).then((order)=> setOrders(order.docs))
    },[firebase])

  return (
    <div>
        <h1>Orders</h1>
        {
            orders.map((order)=>{
                const data =order.data()
                return(
                    <div style={{border: "1px solid black", margin: "5px", padding:"1rem"}}>
                        <p>Ordered By: {data.displayName}</p>
                        <p>Qty: {data.qty}</p>
                        <p>Email: {data.userEmail}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ViewOrderDetails