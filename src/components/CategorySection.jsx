import React from 'react'
import DogCategory from '../assets/Images/dogfood4.jpg'
import CatCategory from '../assets/Images/catfood2.jpg'
import ToyCategory from '../assets/Images/pettoy5.jpeg'


const Categories = [
    {
        title: 'DogFood',
        imageUrl: DogCategory
    },
    {
        title: 'CatFood',
        imageUrl: CatCategory
    },
    {
        title: 'PetToys',
        imageUrl: ToyCategory
    },
];

const CategorySection = () => {
  return (
    <div className='container mx-auto py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 cursor-pointer'>
        {Categories.map((category, index) => (
          <div key={index}  className='relative h-64 transform transition-transform duration-300 hover:scale-105'>
            <img src={category.imageUrl} alt="" className='w-full h-full object-cover border rounded-lg shadow-md' />
              <div className='absolute top-20 left-12'>
                <p className='text-xl font-bold'>{category.title}</p>
                <p className='text-gray-200 font-semibold'>View All</p>
              </div>
            </div>
        ))}
    </div>

  )
}

export default CategorySection