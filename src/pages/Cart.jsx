import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from '../assets/Images/emptycart.jpg'
import { FaTrashAlt } from 'react-icons/fa'
import Modal from '../components/Modal'
import ChangesAddress from '../components/ChangesAddress'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/CartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const [address, setAddress] = useState('main street, 0012')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-8 lg:px-16">
      {cart?.products?.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-center md:text-left">SHOPPING CART</h3>

          <div className="flex flex-col md:flex-row justify-between md:space-x-10 mt-8">
            
            {/* Left Section - Products */}
            <div className="md:w-2/3 w-full">
              {/* Header */}
              <div className="hidden md:flex justify-between border-b items-center mb-4 text-xs font-bold">
                <p>PRODUCTS</p>
                <div className="flex space-x-8">
                  <p>PRICE</p>
                  <p>QUANTITY</p>
                  <p>SUBTOTAL</p>
                  <p>REMOVE</p>
                </div>
              </div>

              {/* Cart Items */}
              <div>
                {cart.products.map((product) => (
                  <div 
                    key={product.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-3 border-b gap-4"
                  >
                    {/* Product Info */}
                    <div className="flex items-center space-x-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 object-contain rounded"
                      />
                      <div>
                        <h3 className="text-base md:text-lg font-semibold">{product.name}</h3>
                        {/* Mobile view price */}
                        <p className="text-sm text-gray-500 md:hidden">Price: ${product.price}</p>
                      </div>
                    </div>

                    {/* Product Actions */}
                    <div className="flex md:space-x-12 items-center justify-between md:justify-start w-full md:w-auto">
                      {/* Desktop price */}
                      <p className="hidden md:block">${product.price}</p>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-center border rounded">
                        <button
                          className="text-xl font-bold px-2 border-r"
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                        >-</button>
                        <p className="px-2">{product.quantity}</p>
                        <button
                          className="text-xl px-2 border-l"
                          onClick={() => dispatch(increaseQuantity(product.id))}
                        >+</button>
                      </div>

                      {/* Subtotal */}
                      <p className="text-sm md:text-base">${(product.quantity * product.price).toFixed(2)}</p>

                      {/* Remove button */}
                      <button 
                        className="text-red-500 hover:text-red-700 ml-4 md:ml-0"
                        onClick={() => dispatch(removeFromCart(product.id))}
                        title="Remove from cart"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Summary */}
            <div className="md:w-1/3 w-full bg-white p-6 rounded-lg shadow-md border mt-8 md:mt-0">
              <h3 className="text-sm font-semibold mb-5">CART TOTAL</h3>
              
              <div className="flex justify-between mb-5 border-b pb-1">
                <span className="text-sm">Total Items:</span>
                <span>{cart.totalQuantity}</span>
              </div>

              <div className="mb-4 border-b pb-2">
                <p>Shipping:</p>
                <p className="ml-2 text-sm">
                  Shipping to <span className="font-bold">{address}</span>
                </p>
                <button
                  className="text-blue-500 hover:underline mt-1 ml-2 text-sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  Change address
                </button>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total Price:</span>
                <span className="font-semibold">${cart.totalPrice.toFixed(2)}</span>
              </div>

              <button 
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Address Modal */}
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
            <ChangesAddress setAddress={setAddress} setIsModalOpen={setIsModalOpen} />
          </Modal>
        </div>
      ) : (
        <div className="flex justify-center">
          <img src={EmptyCart} alt="Empty Cart" className="h-72 md:h-96" />
        </div>
      )}
    </div>
  )
}

export default Cart
