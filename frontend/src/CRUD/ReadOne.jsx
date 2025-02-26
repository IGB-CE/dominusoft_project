import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const ReadOne = () => {
    const { id } = useParams()
    const [item, setItem] = useState({})
    const nav = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:5000/oneItem/" + id)
                .then((res) => setItem(res.data))
                .catch((err) => console.log(err))
        };
        fetchData();
    }, [id])
    const handleDelete = async (id) => {
        await axios.delete("http://localhost:5000/deleteItem/" + id)
            .then((res) => nav("/readAll"))
            .catch((err) => console.log(err))
    }
    return (
        <Container>
            <h1>ReadOne</h1>
            <Row>
                <Col xs={12} md={6}>
                    <img className='img-fluid' src={`http://localhost:5000/images/${item.photo}`} alt="" />
                </Col>
                <Col>
                    <h2>{item.setItem}</h2>
                    <p>{item.desc}</p>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                    <Button variant="warning" href={`/update/${item._id}`}>Update</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ReadOne