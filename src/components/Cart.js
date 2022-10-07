import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import uuid from "react-uuid";

function Cart({ cart, handleDelete, handlePlaceOrder }) {

    const navigate = useHistory();

    const [message, setMessage] = useState(null);

    const backStyle = {
        "color": "blue",
        "marginLeft": "-320px"
    };



    function getTotal() {
        let price = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].quantity > 1) {
                price += cart[i].productPrice * cart[i].quantity;
            } else {
                price += cart[i].productPrice;
            }
        };
        return price.toFixed(2);
    }


    const displayProducts = cart.map(product => {
        return (<tr key={uuid()} >
            <td style={{ color: "yellow" }}>{product.productName}</td>
            <td style={{ color: "yellow" }}>{product.quantity}</td>
            <td style={{ color: "yellow" }}>{product.productPrice}</td>
            <td style={{ color: "red", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleDelete(product.id)}>X</td>
        </tr>)
    })

    function handleNavigation() {

        if (cart.length !== 0) {
            navigate.push("/confirmation")
            handlePlaceOrder();
        } else {
            setMessage("Add an item to your cart")
        }

    }

    return (
        <div id="formBox">
            <div><NavLink to="/home" style={backStyle}>Back</NavLink></div>

            <div>
                <h1>Cart</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayProducts}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total:</th>
                            <th style={{ color: "lightgreen" }}>${getTotal()}</th>
                        </tr>
                    </tfoot>
                </table>
                <label style={{ color: "yellow", fontWeight: "bold" }}>{message}</label>

                <div>
                    <button style={{ padding: "5px", marginTop: "20px", marginBottom: "20px" }} onClick={handleNavigation}>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;