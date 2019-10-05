import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m6'>
          <div className='card blue text-white'>
            <div className='card-content'>
              <ul className='collection'>
                <Link to='/user'>
                  <li className='collection-item'>Пользователь</li>
                </Link>
                <Link to='/login'>
                  <li className='collection-item'>Консультант</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
