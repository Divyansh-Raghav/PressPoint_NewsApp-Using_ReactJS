import React from 'react';
import loading from './loading.gif';

const Spinner=()=>{
    return (
      <div className='text-center'>
        <img
          src={loading}
          alt="loading"
          style={{ width: '80px', height: '80px', margin: '30px auto' }}
        />
      </div>
    );
  }


export default Spinner;
