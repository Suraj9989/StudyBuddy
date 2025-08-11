import React, { useEffect,useState } from 'react';

function Learning() {
    const [data, setData] = useState([]);
    useEffect(() => {
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then( data => {setData(data.products)});
    },[])
    console.log(data)
  return (
    <>
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          data.map(product => (
            <div className="product-card" key={product.id}>
            <div > 

                <div><img src={product.thumbnail} alt="" /></div>

                   <h2 className='text-black text-2xl font-bold'>{product.title}</h2>
                   <p className='line-clamp-2'>{product.description}</p>
                 <p>Price: ${product.price}</p>
                    <div className='flex justify-center align-center px-4 py-1'><button>More details</button></div>
               </div>
            </div>
          ))
        }
    </div>
  </>);
}

export default Learning;


        

