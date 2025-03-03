import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const Details = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [images, setImages] = useState([])
    const nav = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:5000/readProduct/" + id)
                .then((res) => {
                    setProduct(res.data)
                    setImages(res.data.images)
                }
            )
                .catch((err) => console.log(err))
        };
        fetchData();
    }, [id])

    const handleDelete = async (id) => {
        await axios.delete("http://localhost:5000/deleteProduct/" + id)
            .then((res) => nav("/readProducts"))
            .catch((err) => console.log(err))
    }

    return (
        <Container>
            <h1>ReadOne</h1>
            <Row>
                <Col xs={12} md={6}>
                    {
                        images.map(image => (
                            <img className='img-fluid' src={`http://localhost:5000/images/${image}`} alt="" key={image} />
                        ))
                    }
                </Col>
                <Col>
                    <h2>{product.setItem}</h2>
                    <p>{product.description}</p>
                    <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
                    <Button variant="warning" href={`/updateProduct/${product._id}`}>Update</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Details