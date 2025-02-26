import React, { useState } from 'react'
import { Form, Container, Button, InputGroup } from 'react-bootstrap'
import axios from 'axios'

const Create = () => {
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
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const handleImages = (e) => {
        console.log("Array with images: " + e.target.files)
        setProduct({ ...product, images: Array.from(e.target.files) })
        console.log("added product to array")
    }
    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
    
        setProduct((prevProduct) => {
            // Check if the checkbox was checked or unchecked
            if (checked) {
                // Add size if checked
                return { ...prevProduct, sizes: [...prevProduct.sizes, value] };
            } else {
                // Remove size if unchecked
                return { ...prevProduct, sizes: prevProduct.sizes.filter(size => size !== value) };
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append each file separately
        if (Array.isArray(product.images)) {
            console.log(product.images)
            product.images.forEach((image) => {
                formData.append("images", image);
            });
            console.log(formData.images)
        }else{
            console.log(product.images)
        }

        // Append only text fields dynamically
        Object.entries(product).forEach(([key, value]) => {
            if (key !== "images") { // Exclude photos, handle separately
                formData.append(key, value);
            }
        });

        try {
            const res = await axios.post("http://localhost:5000/addProduct", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res.data);
        } catch (err) {
            console.log("Data not added", err);
        }
    }
    return (
        <Container>
            <h1>
                Create Product
            </h1>
            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={product.title} name='name' onChange={handleChange} />
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
                <InputGroup className="mb-3">
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
        </Container>
    )
}

export default Create