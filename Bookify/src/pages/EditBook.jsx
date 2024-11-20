import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useParams } from 'react-router-dom';

const EditBook = () => {

    const [bookName, setBookName] = useState('')
    const [isbnNumber, setIsbnNumber] = useState('')
    const [price, setPrice] = useState('')
    const [coverPic, setCoverPic] = useState('')
    const [amount,setAmount] = useState('')
    const [data, setData] = useState(null)
    const params = useParams() 
    
    
    const firebase = useFirebase()
    
    useEffect(()=>{
        firebase.getBookById(params.bookId).then( (value) =>{
            setData(value.data())
            setBookName(value.data().bookName)
            setIsbnNumber(value.data().isbnNumber)  
            setAmount(value.data().amount)  
            setPrice(value.data().price)  

        } )
    },[])
    
    
    console.log("amount",amount)




    
    // Eikhane edit er function ta daak dibo Nicher function cholbe na
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await firebase.editListing(params.bookId,bookName,isbnNumber,price,amount);
        
    }




    if(data){

        return (
          <div className='container mt-5'>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Enter Book Name</Form.Label>
                      <Form.Control onChange={(e)=> setBookName(e.target.value)} value={bookName} type="text" placeholder={bookName} />
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>ISBN</Form.Label>
                      <Form.Control onChange={(e)=> setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder={isbnNumber} />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Price</Form.Label>
                      <Form.Control onChange={(e)=> setPrice(e.target.value)} value={price} type="text" placeholder={price} />
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control onChange={(e)=> setAmount(Number(e.target.value))} value={amount} type="text" placeholder={amount} />
                  </Form.Group>
      
                  {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Cover Photo</Form.Label>
                      <Form.Control onChange={(e)=> setCoverPic(e.target.files[0])} type="file" />
                  </Form.Group> */}
      
                  <Button variant="primary" type="submit">
                      Edit Book
                  </Button>
              </Form>
          </div>
        )
    }

}

export default EditBook