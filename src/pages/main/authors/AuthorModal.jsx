import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosClient from '../../../plugins/axiosClient';

const AuthorModal = ({ open, toggle, author }) => {
  const [birthdate, setBirthdate] = useState(new Date());
  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (author) {
      setFullName(author.full_name || '');
      setBirthdate(new Date(author.birthdate) || new Date());
      setCountry(author.country || '');
    } else {
      setFullName('');
      setBirthdate(new Date());
      setCountry('');
      setFile(null);
    }
  }, [author]);

  const addAuthor = (e) => {
    e.preventDefault();

    let payload = {
      full_name: fullName,
      birthdate: birthdate.toISOString().slice(0, 10),
      country: country,
    };

    const formData = new FormData();
    formData.append('file', file);

    if (author) {
      axiosClient.patch(`/author/${author.id}`, { ...payload }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.reload();
        }
      });
    } else {
      axiosClient.post('/files/upload', formData).then((response) => {
        if (response?.status === 201) {
          axiosClient
            .post('/author', { ...payload, image: response?.data?.link })
            .then((response) => {
              setBirthdate(new Date(response?.data.birthdate));
              if (response.status === 201) {
                window.location.reload();
              }
            });
        }
      });
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h1>{author ? 'Edit Author' : 'Add Author'}</h1>
      </ModalHeader>
      <ModalBody>
        <form id='author' onSubmit={addAuthor}>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Full name'
            className='form-control my-2'
          />
          <DatePicker selected={birthdate} onChange={(date) => setBirthdate(date)} className='form-control my-2' />
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
            className='form-control my-2'
          />
          <input type='file' placeholder='image' className='form-control my-2' onChange={(e) => setFile(e.target.files[0])} />
        </form>
      </ModalBody>
      <ModalFooter>
        <button type='submit' form='author' className='btn btn-success'>
          {author ? 'Edit Author' : 'Add Author'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AuthorModal;
