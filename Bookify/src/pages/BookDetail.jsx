import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const BookDetail = () => {

    const params = useParams()
    const [data, setData] = useState(null)
    const [url,setURL] = useState(null)
    const [qty,setQty] = useState(1)
    // const [left,setLeft] = useState(null)
    
    const firebase = useFirebase()


    useEffect(()=>{
        firebase.getBookById(params.bookId).then( (value) => setData(value.data()))
    },[])
    

    // useEffect(() => {
    //     firebase.getBookById(params.bookId).then((value) => {
    //       setData(value.data());
    //       if (value.data()) {
    //         setLeft(value.data().amount); // Access amount only if data exists
    //       }
    //     });
    //   }, [params.bookId]); 



    useEffect(()=>{
        if (data){
            const imageURL = data.imgURL;
            firebase.getImgURL(imageURL).then((url) => setURL(url))
        }
    },[data])

    if (data == null){
        return(<h1>Loading...</h1>)
    }

    const placeOrder = async ()=>{
        
        // setLeft(data.amount) 
        // Ekhane ekta if statement boshbe to chk if boi er amount qty er beshi kina 
        if(data.amount >= qty){


            const result = await firebase.placeOrders(params.bookId, qty)
            
            const left = data.amount - qty
            
            await firebase.setAmount(params.bookId,left)


            console.log("order placed:", result)
        }else{
            console.log("Please order reasonable amount")
        }        
    }


  return (
    <div className='container mt-5'>
        <h1>{data.bookName}</h1>
        <img src={url} width="10%" style={{ borderRadius: "20px"}} />

        <h1>Details</h1>
        <p>Price: {data.price}</p>
        <p>ISBN: {data.isbnNumber}</p>
        <h1>Owner Details</h1>
        <p>Name: {data.displayName}</p>
        <p>Email: {data.userEmail}</p>
        <p>Available: {data.amount} units</p>


        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>QTY</Form.Label>
            <Form.Control onChange={(e)=> setQty(e.target.value)} value={qty} type="number" />
        </Form.Group>

        <Button onClick={placeOrder} variant='success' >Buy Now</Button>


    </div>
  )
}

export default BookDetail