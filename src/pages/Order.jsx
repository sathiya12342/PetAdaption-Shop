import React from 'react'
import { useNavigate } from 'react-router-dom';

const Order = ({ order }) => {
    const navigate = useNavigate()
    return (
        <div className='container mx-auto py-8 min-h-96 px-4 md:px-8 lg:px-16'>
            <h2 className='text-xl md:text-2xl font-semibold mb-4 text-center'>Thank you for your order!</h2>
            <p className='text-sm md:text-base text-center'>
                Your Order has been placed successfully, you will receive an email confirmation shortly.
            </p>

            <div className='mt-6 p-4 border rounded-lg bg-gray-100 shadow-sm'>
                <h3 className='text-base md:text-lg font-semibold mb-2'>Order Summary</h3>
                <p className='text-sm md:text-base'>Order Number: {order.orderNumber}</p>

                {/* Shipping Info */}
                <div className='mt-4'>
                    <h2 className='text-base md:text-lg font-semibold mb-2'>Shipping Information</h2>
                    <div className='text-sm md:text-base space-y-1'>
                        <p>{order.shippingInformation.name}</p>
                        <p>{order.shippingInformation.address}</p>
                        <p>{order.shippingInformation.city}</p>
                        <p>{order.shippingInformation.zip}</p>
                    </div>
                </div>

                {/* Items Ordered */}
                <div className='mt-4'>
                    <h3 className='text-base md:text-lg font-semibold mb-2'>Items Ordered</h3>
                    {order.products.map(product => (
                        <div 
                            key={product.id} 
                            className='flex flex-col md:flex-row justify-between mt-2 text-sm md:text-base'
                        >
                            <p>{product.name} x {product.quantity}</p>
                            <p className='md:ml-4'>Price: ${product.price * product.quantity}</p>
                        </div>
                    ))}
                </div>

                {/* Total Price */}
                <div className='mt-4 flex flex-col md:flex-row justify-between items-start md:items-center text-sm md:text-base'>
                    <span>Total Price</span>
                    <span className='font-semibold mt-1 md:mt-0'>${order.totalPrice.toFixed(2)}</span>
                </div>

                {/* Buttons */}
                <div className='mt-6 flex flex-col sm:flex-row sm:justify-center gap-3'>
                    <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm md:text-base'>
                        Track Order
                    </button>
                    <button 
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm md:text-base'
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Order
