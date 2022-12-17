import React, { useState } from 'react';

const UpdateForm = ({defaultValue}) => {
    const [field, setfield] = useState({ email: '', name: '', number: '' });
    const handleChange=(e)=>{
        setfield({...field,[e.target.name]: e.target.value })
    }
    const handleSubmit=(id)=>{
        id.preventDefault()
        // console.log(defaultValue._id);
       fetch(`http://localhost:8000/edit/${defaultValue._id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(field)

       })
       .then(res=>res.json())
       .then(data=>console.log(data))
    }
    return (
        <div className='p-10'>
            <h2 className='text-gray-900'>Edit Your Info</h2>
        <form action='' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='' className='text-3xl'>
              Student Name :{' '}
            </label>
            <input
              type='text'
              name='name'
              placeholder='Student Name'
              defaultValue={defaultValue.name}
              onChange={handleChange}
              className='input input-bordered text-gray-900 input-accent w-full max-w-xs m-5'
            />
          </div>
          <div>
            <label htmlFor='' className='text-3xl'>
              Email :{' '}
            </label>
            <input
              type='text'
              name='email'
              placeholder='Email here'
              onChange={handleChange}
              defaultValue={defaultValue.email}
              className='input input-bordered input-accent text-gray-900 w-full max-w-xs m-5'
            />
          </div>
          <div>
            <label htmlFor='' className='text-3xl'>
              Number :{' '}
            </label>
            <input
              type='text'
              name='number'
              placeholder='Number here'
              defaultValue={defaultValue.number}
              onChange={handleChange}
              className='input input-bordered input-accent w-full text-gray-900 max-w-xs m-5'
            />

          </div>
          <button className='btn btn-success' type='submit'>
            Submit
          </button>
        </form>
      </div>
    );
};

export default UpdateForm;