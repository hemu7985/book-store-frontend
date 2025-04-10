import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../Bookcart/BookCard.jsx';
import Loader from '../Loader/Loader.jsx';


const RecentlyAdded = () => {

  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('https://book-store-backend-3l9h.onrender.com/api/v1/get-recent-books');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetch();
  }, []);

  return (
    <div className='mt-8 px-8'>
      <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
{!Data && 
<div className='flex items-center justify-center my-8'><Loader/> {" "}
</div>}

      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8  my-8'>
        {Data && Data.map((item, i) => (
          <div key={i}>
            <BookCard data={item} />{ " "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyAdded;
