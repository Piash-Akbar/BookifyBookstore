import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

const ListingPage = () => {

    const [bookName, setBookName] = useState('')
    const [isbnNumber, setIsbnNumber] = useState('')
    const [price, setPrice] = useState('')
    const [coverPic, setCoverPic] = useState('')
    const [amount,setAmount] = useState('')

    const firebase = useFirebase()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await firebase.handleCreateNewListing(bookName,isbnNumber,price,coverPic,amount);

    }



  return (
    <div className='container mt-5'>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Book Name</Form.Label>
                <Form.Control onChange={(e)=> setBookName(e.target.value)} value={bookName} type="text" placeholder="Enter Book Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control onChange={(e)=> setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="Enter ISBN Number" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control onChange={(e)=> setPrice(e.target.value)} value={price} type="text" placeholder="Enter price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control onChange={(e)=> setAmount(Number(e.target.value))} value={amount} type="text" placeholder="Enter amount" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cover Photo</Form.Label>
                <Form.Control onChange={(e)=> setCoverPic(e.target.files[0])} type="file" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Add Book
            </Button>
        </Form>
    </div>
  )
}

export default ListingPage