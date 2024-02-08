import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axiosClient from '../../../plugins/axiosClient';
export default function BookModal({open, toggle,book}) {
    const [file, setFile] = useState('');
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        axiosClient.get("/author").then((response)=>{
            setAuthors(response?.data)
        })  
        axiosClient.get("/category/get/all").then((response)=>{
            setCategories(response?.data)
        })
    },[]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        let payload = {
            name: e.target[0].value,
            author_id: +e.target[1].value,
            price: +e.target[2].value,
            code: e.target[3].value,
            janr_id: +e.target[4].value,
            description: e.target[6].value
        }
        console.log(payload);
        const formData = new FormData();
        formData.append("file", file)
        if (book !=="") {
            axiosClient.patch(`/book/update/${book.id}`, { ...payload }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                  window.location.reload();
                }
              });
        }else{
            axiosClient.post("/files/upload", formData).then((response)=>{
                if(response.status === 201){
                    axiosClient.post("/book/create", {...payload, image: response.data.link}).then((response)=>{
                        console.log(response)
                    })
                }
            })
        }
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>
          <h1 className="text-center">Add books</h1>
        </ModalHeader>
        <ModalBody>
          <div>
            <div>
              <form onSubmit={handleSubmit} id="form">
                <input
                  className="form-control my-2"
                  type="text"
                  placeholder="name"
                />
                <select className="form-control my-2">
                  <option value="" hidden>
                    Select author id...
                  </option>
                  {authors?.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.full_name}
                      </option>
                    );
                  })}
                </select>
                <input
                  className="form-control my-2"
                  type="number"
                  placeholder="price"
                /> 
                <input
                  className="form-control my-2"
                  type="number"
                  placeholder="code"
                />
                <select className="form-control my-2">
                  <option value="">Select your janr id...</option>
                  {categories?.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <input
                  className="form-control my-2"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <textarea
                  className="form-control my-2"
                  cols="30"
                  rows="10"
                  placeholder="Description"
                >
                </textarea>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            form="form"
            className="btn btn-info"
          >
            Add books
          </button>
        </ModalFooter>
      </Modal>
    </div>

  )
}