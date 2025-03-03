import React, { useState, useEffect } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        images: [],
        category: "",
        subcategory: "",
        sizes: [],
        date: new Date(),
        bestseller: false
    });
    const [images, setImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:5000/readProduct/" + id)
                .then((res) => {
                    setProduct(res.data)
                    setImages(res.data.images)
                    console.log(res.data)
                })
                .catch((err) => console.log(err))
        };
        fetchData();
    }, [id])
    const handleChange = (e) => {
        setProduct({ ...item, [e.target.name]: e.target.value })
    }
    const handleImages = (e) => {
        setProduct({ ...product, images: Array.from(e.target.files) })
        setUploadedImages(URL.createObjectURL(e.target.files));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(item).forEach(([key, value]) => {
            formData.append(key, value)
        })
        await axios.patch(`http://localhost:5000/updateProduct/${id}`, formData)
            .then((res) => console.log(res))
            .catch(err => console.log("Data not added", err))
    }
    return (
        <Container>
        <h1>
            Update Product
        </h1>
        <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={product.name} name='name' onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={product.description} name='description' onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="images">
                <Form.Label>Images</Form.Label>
                <Form.Control
                    type='file'
                    onChange={handleImages}
                    name='images'
                    accept='.jpg, .png, .jpeg, .webp'
                    multiple />
            </Form.Group>
            <Form.Select className="mb-3" aria-label="category" value={product.category} name='category' onChange={handleChange} >
                <option>Category</option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="kids">kids</option>
            </Form.Select>
            <Form.Select className="mb-3" aria-label="subcategory" value={product.subcategory} name='subcategory' onChange={handleChange} >
                <option>Subcategory</option>
                <option value="winter">winter</option>
                <option value="summer">summer</option>
            </Form.Select>
            <Form.Label htmlFor="sizes">Sizes</Form.Label>
            <InputGroup className="mb-3" id='sizes'>
                <InputGroup.Checkbox
                    aria-label="small"
                    name="sizes"
                    value="S"
                    checked={product.sizes.includes("S")}
                    onChange={handleCheckbox}
                />
                <Form.Text className='mx-3'>S</Form.Text>

                <InputGroup.Checkbox
                    aria-label="medium"
                    name="sizes"
                    value="M"
                    checked={product.sizes.includes("M")}
                    onChange={handleCheckbox}
                />
                <Form.Text className='mx-3'>M</Form.Text>

                <InputGroup.Checkbox 
                    aria-label="large"
                    name="sizes"
                    value="L"
                    checked={product.sizes.includes("L")}
                    onChange={handleCheckbox}
                />
                <Form.Text className='mx-3'>L</Form.Text>

                <InputGroup.Checkbox
                    aria-label="extralarge"
                    name="sizes"
                    value="XL"
                    checked={product.sizes.includes("XL")}
                    onChange={handleCheckbox}
                />
                <Form.Text className='mx-3'>XL</Form.Text>
            </InputGroup>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
             {
                uploadedImages ? (
                    uploadedImages.map((image) => {
                        return (
                            <img
                                src={image}
                                alt='image'
                                rounded
                                className='img-fluid'
                            />
                        )
                    })
                ) : (
                    images.map(image => (
                        <img className='img-fluid' src={`http://localhost:5000/images/${image}`} alt={image} name={image} />
                    ))
                )
            } 
        </Container>
    )
}

export default Update