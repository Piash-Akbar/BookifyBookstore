import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut  } from "firebase/auth";

import { getDoc, getFirestore, doc, query, where, updateDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDownloadURL, getStorage , ref, uploadBytes } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getDocs } from "firebase/firestore"; 

//mytry
import { getDatabase, onValue } from "firebase/database";


const FirebaseContext = createContext(null)
const firebaseConfig = {
    apiKey: "AIzaSyCfVqUAyia3qusmDtzHqQT1rw7evh1ghj0",
    authDomain: "bookify-f8ade.firebaseapp.com",
    projectId: "bookify-f8ade",
    storageBucket: "bookify-f8ade.appspot.com",
    messagingSenderId: "745262757095",
    appId: "1:745262757095:web:20f766891c983201749e42",
    measurementId: "G-35HG0Z36JP"
  };
  



export const useFirebase = () => useContext(FirebaseContext)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
//Storage...
const storage = getStorage(app)


// Auth
const auth = getAuth(app)
//Google Auth Provider
const provider = new GoogleAuthProvider();



export const FirebaseProvider = (props)=>{
    const signupWithEmailAndPass = (email, password) =>{
        createUserWithEmailAndPassword(auth, email, password)
    }

    const signinWithEmailAndPass = (email, password) =>{
        signInWithEmailAndPassword(auth, email, password)
    }
    const signinWithGoogle = ()=>{
        signInWithPopup(auth,provider)
    }


    const signMeOut = ()=>{
        const out = signOut(auth).then(()=>{
            console.log("Log Out Successful")
        })
        return out
     }


    //User logged in or not
    const [user,setUser] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if (user) {
                setUser(user) 
                // console.log("User logged In",user.uid)               
            }else{
                setUser(null)
            }
        })
    })

    //Listing data
     const handleCreateNewListing = async (bookName, isbnNumber, price,coverPic,amount) =>{
        const imgRef = ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`)
        const uploadResult = await uploadBytes(imgRef, coverPic)
        return await addDoc(collection(db, 'books'),{
            bookName,
            isbnNumber,
            price,
            amount,
            imgURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })
     }

     const listAllBooks = ()=>{
        return (getDocs(collection(db,'books')))
     }

     const getImgURL =(path)=>{
        return getDownloadURL(ref(storage,path))
     }

     const getBookById = async (id)=>{
        const docRef = doc(db,'books',id)
        const result = await getDoc(docRef)
        return result
     }

     const placeOrders = async (bookId, qty) =>{
        const collectionRef = collection(db,"books",bookId, "orders")
        const result = await addDoc(collectionRef,{
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty),
        })
        return result
     }

     const fetchMyBooks = async (userID)=>{
        const bookRef = collection(db, "books");
        const q = query(bookRef, where("userID", "==", userID));

        const result = await getDocs(q)
        console.log("result",result)
        return result
     }

     const getOrders = async (bookId)=>{
        const collectionRef = collection(db,'books',bookId,'orders')
        const result = await getDocs(collectionRef)
        console.log("RESULT",result)
        return result
     }


    //  database = getDatabase()
     const setAmount = async (bookId, amount)=>{
        const amountRef = doc(db,"books",bookId)
        await updateDoc(amountRef,{
            amount: Number(amount)
        })
     }

     //EditBook
     const editListing = async(bookId, bookName, isbnNumber, price, amount)=>{
        const listRef = doc(db,"books",bookId)
        await updateDoc(listRef,{
            bookName,
            isbnNumber,
            price,
            amount,
        })

     }




    const isLoggedIn = user ? true : false
    
    
    return (<FirebaseContext.Provider value = {{ signupWithEmailAndPass,
    signinWithEmailAndPass,
    signinWithGoogle,
    isLoggedIn,
    handleCreateNewListing,
    listAllBooks,
    getImgURL,
    getBookById,
    placeOrders,
    fetchMyBooks,
    user,
    signMeOut,
    getOrders,
    setAmount,
    editListing }}>{props.children}
    </FirebaseContext.Provider>)
}