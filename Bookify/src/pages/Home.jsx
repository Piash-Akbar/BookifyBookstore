import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BookCard from '../components/BookCard'
import CardGroup from 'react-bootstrap/CardGroup';

const Home = () => {

  const [books, setBooks] = useState([])

  const firebase = useFirebase()
  useEffect(()=>{
    firebase.listAllBooks().then(books => setBooks(books.docs))
  },[])
  
  // 


  return (
    <div className='container'>
      <CardGroup>
      {books.map((book) => (<BookCard link ={firebase.user.uid === book.data().userID ? `/books/edit/${book.id}` : `/books/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />))}
      </CardGroup>
    </div>
  )
}

export default Home