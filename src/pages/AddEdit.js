import { useState, useEffect, React } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
// import useHistory from "react-router-dom";
import './AddEdit.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
  name: '',
  email: '',
  contact: '',
}
const AddEdit = () => {
  const [state, setState] = useState(initialState)
  const { name, email, contact } = state
  const history = useHistory()
  //taheta for update
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }))
  }, [id])

  const handleSubmit = (e) => {
    //eza bas la tzid hadan aandak, aamol awal if baaden else axios of post without !id check 1:08
    e.preventDefault()
    if (!name || !email || !contact) {
      toast.error('please provide valie into each input')
    } else {
      if (!id) {
        axios
          .post('http://localhost:3000/api/post', {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: '', email: '', contact: '' })
          })
          .catch((err) => toast.error(err.response.data))
        toast.success('contact added successfully')
      } else {
        axios
          .put(`http://localhost:3000/api/update/${id}`, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: '', email: '', contact: '' })
          })
          .catch((err) => toast.error(err.response.data))
        toast.success('contact updated successfully')
      }

      setTimeout(() => history.push('/'), 500)
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          paddin: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="your name...."
          value={name || ''}
          onChange={handleInputChange}
        />{' '}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="your email...."
          value={email || ''}
          onChange={handleInputChange}
        />{' '}
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="your name...."
          value={contact || ''}
          onChange={handleInputChange}
        />{' '}
        <input type="submit" value={id ? 'Update' : 'Save'} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
      <h2>Add Edit</h2>
    </div>
  )
}

export default AddEdit
