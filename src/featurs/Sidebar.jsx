import React, { useState } from 'react'
import './sidebar.css'
export default function Sidebar() {
    const [links,setLinks] = useState([
        {id:1,title:"Books"},
        {id:2,title:"Authors"},
        {id:3,title:"Genre"},
    ])
    const setActive =(id)=>{
        localStorage.setItem('id',id)
        window.location.reload()
    }
  return (
    <div className='sidebar'>
        <ul className='sidebar-item'>
            {
                links.map((item,index)=>{
                    return <li key={index}>
                       <button className='btn btn-success' onClick={()=>setActive(item.id)}>{item.title}</button>
                    </li>
                })
            }
        </ul>
    </div>
  )
}
