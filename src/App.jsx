import { HashRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import Checkout from "./pages/checkout"
import Order from "./pages/Order"
import FilterData from "./pages/FilterData"
import ProductDetail from "./pages/ProductDetail"
import { useState, useEffect } from "react"
import PetAdoption from "./pages/PetAdoption";
import About from "./pages/About";
import Contact from "./pages/Contact";



function App() {
  const [order, setOrder] = useState(() => {
    // localStorage la irundha data load pannum
    const savedOrder = localStorage.getItem("order");
    return savedOrder ? JSON.parse(savedOrder) : null;
  });

  // whenever order update panna, localStorage la save pannum
  useEffect(() => {
    if (order) {
      localStorage.setItem("order", JSON.stringify(order));
    }
  }, [order]);


  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout setOrder={setOrder} />}></Route>
        <Route path="/order-confirmation" element={<Order order={order} />}></Route>
        <Route path="/filter-data" element={<FilterData />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/petadoption" element={<PetAdoption />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
   </HashRouter>
  )
}

export default App
