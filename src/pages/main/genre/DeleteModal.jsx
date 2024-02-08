import React from 'react'
import { Modal,ModalBody,ModalFooter } from 'reactstrap'
import axiosClient from './../../../plugins/axiosClient';
const DeleteModal = ({open,toggle,id}) => {
    const deleteGenre=()=>{
        axiosClient.delete(`/category/delete/${id}`).then(res=>{
            if (res.status === 200) {
                window.location.reload()
            }
        })
    }
  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
            <h1>Are you sure you want to delete?</h1>
        </ModalBody>
        <ModalFooter>
            <button  className='btn btn-info' onClick={toggle}>cancel</button>
            <button className='btn btn-danger' onClick={deleteGenre}>delete</button>
        </ModalFooter>
    </Modal>
  )
}

export default DeleteModal
