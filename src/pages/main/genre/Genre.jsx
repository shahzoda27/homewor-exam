import React, { useEffect, useState } from 'react'
import axiosClient from '../../../plugins/axiosClient'
import DeleteModal from './DeleteModal';
import GenreModal from './GenreModal'
const Genre = () => {
  const [genres, setGenres]= useState([])
  const [modalVisible, setModalVisible]= useState(false)
  const [deleteModal, setDeleteModal]= useState(false)
  const [id, setId]= useState()
  const [genre, setGenre]= useState("")
  useEffect(()=>{
    axiosClient.get('/category/get/all').then((res)=>{
      console.log(res);
     setGenres(res.data)
    }).catch(err=>{
      console.log(err);
    })
  },[])
  const openDeleteModal = (id)=>{
    setId(id)
    setDeleteModal(true)
  }
  const openEditModal = (item)=>{
   setGenre({...item})
   setModalVisible(true)
  }
   const toggle = ()=>{
    setModalVisible(false)
    setGenre('')
   }
  return (
    <div className='container'>
      <GenreModal open={modalVisible} toggle={toggle} genre={genre}/>
      <DeleteModal open={deleteModal} toggle={()=>setDeleteModal(false)} genre={genre} id={id}/>
      <button className='btn btn-info' onClick={()=>setModalVisible(true)}>Add genre</button>
      <div className='row'>
          <div className="col-md-8 offset-2">
          <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           {
            genres.map((item,index)=>{
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
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

export default Genre
