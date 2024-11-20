import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";


function BookCard(props) {

  const firebase = useFirebase()
  const [url, setURL] = useState('')
  useEffect(()=>{
    firebase.getImgURL(props.imgURL).then((url)=> setURL(url))
  },[])

  const navigate= useNavigate()

  // console.log(props.userEmail)

  
    
    return (
      <div className="mt-5">
  
      <Card style={{ width: '18rem', margin:'5px', borderRadius:'10px', backgroundColor:'wheat' }}>
        <Card.Img style={{height: '12rem'}} variant="top" src={url} />
        <Card.Body>
          <Card.Title>Title: {props.bookName} <br /></Card.Title>
          <Card.Text>

            Seller: {props.displayName} <br />
            Price: {props.price} <br />
            {props.amount} units left <br />
          </Card.Text>
  
          {/* If statement will take here to verify if it's my added book or not  */}
         
  
          <Button onClick={e => navigate(props.link)} variant="primary">{firebase.user.uid === props.userID ? "Edit" : "View"}</Button>
        </Card.Body>
      </Card>
      </div>
    );
  }
  





export default BookCard;