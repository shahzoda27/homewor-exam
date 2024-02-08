import React, { useEffect, useState } from 'react'
import axiosClient from '../../../plugins/axiosClient'
import DeleteModal from './DeleteModal';
import BookModal from './BookModal';
const Books = () => {
  const [books, setBooks]= useState([])
  const [modalVisible, setModalVisible]= useState(false)
  const [deleteModal, setDeleteModal]= useState(false)
  const [id, setId]= useState()
  const [book, setBook]= useState("")
  useEffect(()=>{
    axiosClient.get('/book').then((res)=>{
      console.log(res);
     setBooks(res.data)
    }).catch(err=>{
      console.log(err);
    })
  },[])
  const openDeleteModal = (id)=>{
    setId(id)
    setDeleteModal(true)
  }
  const openEditModal = (item)=>{
   setBook({...item})
   setModalVisible(true)
  }
   const toggle = ()=>{
    setModalVisible(false)
    setBook('')
   }
  return (
    <div className='container'>
      <BookModal open={modalVisible} toggle={toggle} book={book}/>
      <DeleteModal open={deleteModal} toggle={()=>setDeleteModal(false)} book={book} id={id}/>
      <button className='btn btn-info' onClick={()=>setModalVisible(true)}>Add book</button>
      <div className='row'>
          <div className="col-md-8 offset-2">
          <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Name</th>
              <th>Author</th>
              <th>Price</th>
              <th>Code</th>
              <th>Janr</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           {
            books.map((item,index)=>{
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.author_id}</td>
                <td>{item.price}</td>
                <td>{item.code}</td>
                  <td>{item.janr_id}</td>
                <td>
                  <img src={item.image} alt="" width='400px' height='400px'/>
                  </td>
                  <td>{item.description}</td>
                <td>
                  <button className='btn btn-info' onClick={()=>openEditModal(item)}>Edit</button>
                  <button className='btn btn-danger' onClick={()=>openDeleteModal(item.id)}>Delete</button>
                </td>
              </tr>
            })
           }
          </tbody>
        </table>
          </div>
      </div>
    </div>
  )
}

export default Books
