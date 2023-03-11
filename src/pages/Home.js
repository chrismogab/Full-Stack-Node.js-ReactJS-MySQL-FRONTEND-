import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { toast } from 'react-toastify'
import axios from 'axios'

function Home() {
  const [data, setData] = useState([])
  const loadData = async () => {
    const response = await axios.get('http://localhost:3000/api/get')
    setData(response.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to dleete contact?')) {
      axios.delete(`http://localhost:3000/api/remove/${id}`)
      toast.success('contact deleted successfully!')
      setTimeout(() => loadData(), 500)
    }
  }
  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>no</th>
            <th style={{ textAlign: 'center' }}>name</th>
            <th style={{ textAlign: 'center' }}>email</th>
            <th style={{ textAlign: 'center' }}>contact</th>
            <th style={{ textAlign: 'center' }}>action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">edit</button>
                  </Link>
                  {/* <Link to={`/delete/${item.id}`}> */}
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>
                  {/* </Link> */}
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
