import React, { useEffect, useState } from 'react'
import axiosClient from '../../../plugins/axiosClient'
import AuthorModal from './AuthorModal'
import DeleteModal from './DeleteModal';
const Authors = () => {
  const [authors, setAuthors]= useState([])
  const [modalVisible, setModalVisible]= useState(false)
  const [deleteModal, setDeleteModal]= useState(false)
  const [id, setId]= useState()
  const [author, setAuthor]= useState("")
  useEffect(()=>{
    axiosClient.get('/author').then((res)=>{
      console.log(res);
     setAuthors(res.data)
    }).catch(err=>{
      console.log(err);
    })
  },[])
  const openDeleteModal = (id)=>{
    setId(id)
    setDeleteModal(true)
  }
  const openEditModal = (item)=>{
   setAuthor({...item})
   setModalVisible(true)
  }
   const toggle = ()=>{
    setModalVisible(false)
    setAuthor('')
   }
  return (
    <div className='container'>
      <AuthorModal open={modalVisible} toggle={toggle} author={author}/>
      <DeleteModal open={deleteModal} toggle={()=>setDeleteModal(false)} author={author} id={id}/>
      <button className='btn btn-info' onClick={()=>setModalVisible(true)}>Add author</button>
      <div className='row'>
          <div className="col-md-8 offset-2">
          <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Full Name</th>
              <th>Birth date</th>
              <th>Country</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           {
            authors.map((item,index)=>{
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.full_name}</td>
                <td>{item.birthdate}</td>
                <td>{item.country}</td>
                <td>
                  <img src={item.image} alt="" width='400px' height='400px'/>
                  </td>
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

export default Authors
