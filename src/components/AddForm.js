import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
function AddForm({ setProducts, products }) {

    const backStyle = {
        "color": "blue",
        "marginLeft": "-320px"
    };

    const [productName, setProductName] = useState(null);
    const [image, setImage] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [category, setCategory] = useState(null);

    //blogggg version 5
    const navigate = useHistory()


    function handleProductName(e) {
        setProductName(e.target.value);

    }

    function handleImage(e) {
        setImage(e.target.value);
    }

    function handleProductPrice(e) {
        setProductPrice(e.target.value);
    }

    function handleProductCategory(e) {
        setCategory(e.target.value);
    }

    function handleForm(e) {
        e.preventDefault();

        const newProduct = {
            "id": 0,
            "productName": productName,
            "image": image,
            "productPrice": parseFloat(productPrice),
            "quantity": 1,
            "category": category
        }

        fetch('https://ishopping-app-server.herokuapp.com/products', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
            .then(r => r.json())
            .then(data => {
                setProducts([...products, data])
                navigate.push('/home')
            })


    }
    return (
        <div id='formBox'>
            <div>
                <div><NavLink to="/home" style={backStyle}>Back</NavLink></div>
                <h1>Add a Product</h1>
                <form onSubmit={handleForm}>
                    <div className='text_field'>
                        <input type='text' onChange={handleProductName} required></input>
                        <span></span>
                        <label>Product Name</label>
                    </div>
                    <div className='text_field'>
                        <input type='text' onChange={handleImage} required></input>
                        <span></span>
                        <label>Image Url:</label>
                    </div>
                    <div className='text_field'>
                        <input type='text' onChange={handleProductPrice} required></input>
                        <span></span>
                        <label>Product Price:</label>
                    </div>

                    <div className='text_field'>
                        <input type='text' onChange={handleProductCategory} required></input>
                        <span></span>
                        <label>Product Category</label>
                    </div>

                    <button type='submit'>Add</button>

                </form>
            </div>
        </div>
    )
}

export default AddForm;
