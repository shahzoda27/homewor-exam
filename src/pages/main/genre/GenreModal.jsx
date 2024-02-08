import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axiosClient from '../../../plugins/axiosClient';

const GenreModal = ({ open, toggle, genre }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (genre) {
      setName(genre.name || '');
    } else {
      setName('');
    }
  }, [genre]);

  const addGenre = (e) => {
    e.preventDefault();

    let payload = {
      name: name,
    };

    if (genre) {
      axiosClient.patch(`/category/update/${genre.id}`, { ...payload }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          toggle(); 
          window.location.reload();
        }
      });
    } else {
      axiosClient.post('/category/create', { ...payload }).then((response) => {
        if (response.status === 201) {
          toggle(); 
          window.location.reload();
        }
      });
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h1>{genre ? 'Edit Genre' : 'Add Genre'}</h1>
      </ModalHeader>
      <ModalBody>
        <form id='genre' onSubmit={addGenre}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            className='form-control my-2'
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <button type='submit' form='genre' className='btn btn-success'>
          {genre ? 'Edit Genre' : 'Add Genre'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default GenreModal;
