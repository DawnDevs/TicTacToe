import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000); 

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div>
            <h1 className='text-3xl text-center py-5'>Home</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='gap-10 flex justify-center py-5'>
                    <button className='bg-green-500 py-2 px-3 rounded-lg hover:bg-green-600' onClick={()=>navigation('/Game')}>Play Solo</button>
                    <button className='bg-blue-500 py-2 px-3 rounded-lg hover:bg-blue-600' onClick={() => navigation('/Game')}>Find a Match</button>
                </div>
            )}
        </div>
    );
}

export default Home;
