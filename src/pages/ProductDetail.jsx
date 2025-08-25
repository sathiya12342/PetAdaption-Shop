import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaCarSide, FaQuestion } from 'react-icons/fa'
import { addToCart } from "../redux/CartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const products = useSelector(state => state.product.products);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // ✅ New state
  const dispatch = useDispatch();

  useEffect(() => {
    const newProduct = products.find(
      (item) => item.id === parseInt(id)
    );
    setProduct(newProduct);
  }, [id, products]);

  if (!product) return <div>Loading...</div>;

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <div className='flex flex-col md:flex-row gap-x-16'>
        {/* Product Image */}
        <div className='md:w-1/2 py-4 shadow-md md:px-8 h-96 flex justify-center'>
          <img src={product.image} alt={product.name} className='h-full object-contain' />
        </div>

        {/* Product Details */}
        <div className='md:w-1/2 p-4 shadow-md md:p-16 flex flex-col items-center gap-y-2'>
          <h2 className='text-3xl font-semibold mb-2'>{product.name}</h2>
          <p className='text-xl font-semibold text-gray-800 mb-4'>${product.price}</p>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-2 mb-4">
            <button 
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="px-4 py-1 border rounded">{quantity}</span>
            <button 
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>

          <button 
            className='bg-red-600 text-white py-2 px-6 hover:bg-red-800 rounded'
            onClick={() => dispatch(addToCart({ ...product, quantity }))}
          >
            Add to cart
          </button>

          {/* Info Section */}
          <div className='flex flex-col gap-y-4 mt-4'>
            <p className='flex items-center'>
              <FaCarSide className='mr-1' /> Delivery & Return
            </p>
            <p className='flex items-center'>
              <FaQuestion className='mr-1' /> Ask a Question
            </p>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className='mt-8'>
        <h3 className='text-xl font-semibold'>Product Description</h3>
        <p>Product description will go here</p>
      </div>
    </div>
  );
};

export default ProductDetail;
