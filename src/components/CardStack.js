import React from "react";
import Card from "./Card";
import "../css/card.css"

function CardStack({ products, handleAddOnCart, handleDeleteItem, one, two, isAdmin }) {



    const displayProducts = products.map(product => {
        return (<Card key={product.id} id={product.id} name={product.productName} image={product.image} price={product.productPrice} handleAddOnCart={handleAddOnCart} handleDeleteItem={handleDeleteItem} isAdmin={isAdmin} />)
    })
    return (
        <div className="container">
            <input type="radio" name="dot" id={one}></input>
            <input type="radio" name="dot" id={two}></input>
            <div className="main-card">
                <div className="cards">
                    {displayProducts}
                </div>
            </div>
            <div className="button">
                <label htmlFor={one} className={`${one} active`}></label>
                <label htmlFor={two} className={two}></label>
            </div>
        </div>
    )
}

export default CardStack;