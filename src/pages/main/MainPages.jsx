import React, { useState } from 'react'
import Sidebar from '../../featurs/Sidebar'
import Books from './book/Books';
import Authors from './authors/Authors';
import Genre from './genre/Genre';

export default function MainPages() {
    const [main,setMain] = useState([
        {id:1,component:<Books/>},
        {id:2,component:<Authors/>},
        {id:3,component:<Genre/>},
    ])
    let id = localStorage.getItem("id")
  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-3">
                <Sidebar/>
            </div>
            <div className="col-md-6">
                {
                    main.filter(item=> item.id == id).map((item,index)=>{
                        return item.component
                    })
                }
            </div>
        </div>
    </div>
  )
}
