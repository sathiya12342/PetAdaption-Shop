import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Checkout = ({ setOrder }) => {
  const [billingToggle, setBillingToggle] = useState(true)
  const [shippingToggle, setShippingToggle] = useState(false)
  const [paymentToggle, setPaymentToggle] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zip: ''
  })

  const cart = useSelector((state) => state.cart)
  const navigate = useNavigate()

  const handleOrder = () => {
    const newOrder = {
      products: cart.products,
      orderNumber: Date.now(),
      shippingInformation: shippingInfo,
      totalPrice: cart.totalPrice,
    }
    setOrder(newOrder)
    navigate('/order-confirmation')
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24 min-h-screen">
      <h3 className="text-2xl font-bold mb-6">Checkout</h3>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1">
          {/* Billing Info */}
          <div className="border rounded-lg shadow-sm p-4 mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setBillingToggle(!billingToggle)}
            >
              <h3 className="text-lg font-semibold">Billing Information</h3>
              {billingToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                billingToggle ? 'max-h-screen mt-4' : 'max-h-0'
              }`}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border rounded-lg shadow-sm p-4 mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShippingToggle(!shippingToggle)}
            >
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                shippingToggle ? 'max-h-screen mt-4' : 'max-h-0'
              }`}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="w-full px-3 py-2 border rounded"
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, address: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="w-full px-3 py-2 border rounded"
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    placeholder="Enter zip code"
                    className="w-full px-3 py-2 border rounded"
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, zip: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border rounded-lg shadow-sm p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setPaymentToggle(!paymentToggle)}
            >
              <h3 className="text-lg font-semibold">Payment Method</h3>
              {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                paymentToggle ? 'max-h-screen mt-4' : 'max-h-0'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <label className="ml-2">Cash On Delivery</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'DebitCard'}
                    onChange={() => setPaymentMethod('DebitCard')}
                  />
                  <label className="ml-2">Debit Card</label>
                </div>

                {paymentMethod === 'DebitCard' && (
                  <div className="bg-gray-100 p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block mb-1 font-semibold">Card Number</label>
                      <input
                        type="text"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold">Card Holder Name</label>
                      <input
                        type="text"
                        placeholder="Enter name on card"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold">CVV</label>
                        <input
                          type="text"
                          placeholder="***"
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md border h-fit sticky top-24">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold">{product.name}</h4>
                    <p className="text-xs text-gray-600">
                      ${product.price} x {product.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-gray-700">
                  ${(product.price * product.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
