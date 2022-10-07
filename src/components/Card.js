import React from "react";
import '../css/card.css'


function Card({ id, name, image, price, handleAddOnCart, handleDeleteItem, isAdmin }) {

    function handleOnCart() {
        handleAddOnCart(id);
    }

    function handleDelete() {
        handleDeleteItem(id);
    }

    const admin = isAdmin ? { display: "block" } : { display: "none" };

    return (
        <div className="card">
            <div className="content">
                <div className="img">
                    <img src={image} alt={name} />
                </div>
                <div className="details">
                    <div style={{ color: "black" }} className="name">{name}</div>
                    <div className="price">${price}</div>
                </div>
                <div className="addToCart">
                    <button onClick={handleOnCart}>Add To Cart</button>
                </div>
                <div className="delete-button">
                    <button onClick={handleDelete} style={admin} >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Card;