import React, {useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const Contact = () => {
    const [addContact, setAddContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        comment: "",
    });
    const handleChange = (e)=>{
        setAddContact({...addContact, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await axios
        .post("http://localhost:5000/addContact", addContact)
        .then((res) => {
            console.log("Contact added")
        })
        .catch((err) => console.log("Contact not saved", err))
    }
    return (
        <Container>
            <h1>Contact form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={addContact.firstName} name='firstName' onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={addContact.lastName} name='lastName' onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={addContact.email} name='email' onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} value={addContact.comment} name='comment' onChange={handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Contact