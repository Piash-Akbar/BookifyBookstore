import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BookCard from '../components/BookCard'
import CardGroup from 'react-bootstrap/CardGroup';


function ViewOrders() {
    const firebase = useFirebase()
    const [books, setBooks] = useState([]) 

    useEffect(()=>{
        if(firebase.isLoggedIn){

          firebase.fetchMyBooks(firebase.user.uid)?.then((books) => setBooks(books.docs))
          
        }

    },[firebase]);

    console.log("Ordered books:", books)

    if(!firebase.isLoggedIn){
        return(
            <h1>Please Log in first.</h1>
        )
    }

    // console.log(books.docs)

  return (
    <div>
      <CardGroup>
        {
          books.map(book => <BookCard link={`/books/orders/${book.id}`} key= {book.id} id= {book.id} {...book.data()} />)
        }
      </CardGroup>
    </div>
  )
}

export default ViewOrders
