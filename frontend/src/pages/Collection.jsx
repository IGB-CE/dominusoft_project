import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const Collection = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:5000/getProducts")
                .then((res) => setProducts(res.data))
                .catch((err) => console.log(err))
        };
        fetchData();
    }, [])
    return (
        <Container>
            <h1>Collection</h1>
            <Row>
                {
                    products.map((product) => {
                        return (
                            <Col xs={12} md={6} lg={4} key={item._id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`http://localhost:5000/images/${product.images}`} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Button variant="primary" href={`/getProduct/${product._id}`}>Read More</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default ReadAll