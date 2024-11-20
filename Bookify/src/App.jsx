import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import MyNavbar from "./components/MyNavbar"
import ListingPage from "./pages/ListingPage"
import BookDetail from "./pages/BookDetail"
import ViewOrders from "./pages/ViewOrders"
import ViewOrderDetails from "./pages/ViewOrderDetails"
import EditBook from "./pages/EditBook"

function App() {

  return (
    <div>
      <MyNavbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/books/list" element={<ListingPage/>} />
      <Route path="/books/view/:bookId" element={<BookDetail />} />
      <Route path="/books/orders" element={<ViewOrders />} />
      <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
      <Route path="/books/edit/:bookId" element={<EditBook />} />


    </Routes>
    </div>
  )
}

export default App
