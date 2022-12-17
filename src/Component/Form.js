import React, { useEffect, useState } from 'react';
import UpdateForm from './UpdateForm';

const Form = () => {
  const [user, setUser] = useState([]);
  const [field, setfield] = useState({ email: '', name: '', number: '' });
  const [isDeleted, setIsDelted] = useState();
  const [defaultValue,setdefaultValue]=useState({})
  useEffect(() => {
    fetch('http://localhost:8000/student')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleChange = (e) => {
    setfield({ ...field, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/students', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(field),
    })
      .then((res) => res.json())
      .then((data) => {
        const totalUser = [...user, data];
        setUser(totalUser);
      });
    setfield({ email: '', name: '', number: '' });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/student/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const notDeletedItem = user.filter((item) => item._id !== id);
          setUser(notDeletedItem);
          alert('deleted succesfully');
        }
      });
  };
const handleEdit=(id)=>{
  setdefaultValue(id)
}
  return (
    <div className='p-10'>
      <form action='' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='' className='text-3xl'>
            Student Name :{' '}
          </label>
          <input
            type='text'
            name='name'
            placeholder='Student Name'
            onChange={handleChange}
            className='input input-bordered input-accent w-full max-w-xs m-5'
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
            className='input input-bordered input-accent w-full max-w-xs m-5'
          />
        </div>
        <div>
          <label htmlFor='' className='text-3xl'>
            Number :{' '}
          </label>
          <input
            type='text'
            name='number'
            onChange={handleChange}
            placeholder='Number'
            className='input input-bordered input-accent w-full max-w-xs m-5'
          />
        </div>
        <button className='btn btn-success' type='submit'>
          Submit
        </button>
      </form>
      <h2 className='font-bold text-4xl'>length : {user.length}</h2>
      <div className='text-gray-100 text-2xl'>
        {user.map((item) => (
          <div key={item._id}>
            {item.name} {item.email}
            {/* The button to open modal */}
            <label htmlFor='my-modal-4' className='btn' onClick={()=>handleEdit(item)}>
              Edit
            </label>

            {/* modal start */}
            <input type='checkbox' id='my-modal-4' className='modal-toggle' />
            <label htmlFor='my-modal-4' className='modal cursor-pointer'>
              <label className='modal-box relative' htmlFor=''>
                <UpdateForm defaultValue={defaultValue}></UpdateForm>
              </label>
            </label>

            {/* modal end*/}
            <button
              onClick={() => handleDelete(item._id)}
              className='btn btn-danger'
            >
              delete
            </button>
          </div>
        ))}
        {/* <UpdateForm></UpdateForm> */}
      </div>
    </div>
  );
};

export default Form;
