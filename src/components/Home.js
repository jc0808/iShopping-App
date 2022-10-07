import React, { useState } from "react";
import CardStack from "./CardStack";
import Nav from "./Nav";


function Home({ currentUser, products, handleAddOnCart, cartNum, isAdmin, handleDeleteItem }) {

    //remember to change the addform to add a select for the categories

    const displayFruits = products.filter(product => {
        return product.category === 'fruit' || product.category === 'vegetable';
    });

    const displayBeverages = products.filter(product => {
        return product.category === 'beverage';
    });

    const displaySnacks = products.filter(product => {
        return product.category === 'snack';
    });

    const displayPersonalCare = products.filter(product => {
        return product.category === 'personal care';
    });
    const displayLaundry = products.filter(product => {
        return product.category === 'household';
    });



    return (<div>

        <div>
            <Nav currentUser={currentUser} cartNum={cartNum} isAdmin={isAdmin} />
        </div>
        <div className="aisle">
            <h1>Fruits and vegetables</h1>
            <CardStack products={displayFruits} handleAddOnCart={handleAddOnCart} handleDeleteItem={handleDeleteItem} isAdmin={isAdmin} one={"one"} two={"two"} />
        </div>
        <div className="aisle">
            <h1>Beverages and Juices</h1>
            <CardStack products={displayBeverages} handleAddOnCart={handleAddOnCart} handleDeleteItem={handleDeleteItem} isAdmin={isAdmin} one={"one2"} two={"two2"} />
        </div>
        <div className="aisle">
            <h1>Snacks</h1>
            <CardStack products={displaySnacks} handleAddOnCart={handleAddOnCart} handleDeleteItem={handleDeleteItem} isAdmin={isAdmin} one={"one3"} two={"two3"} />
        </div>
        <div className="aisle">
            <h1>Personal Care</h1>
            <CardStack products={displayPersonalCare} handleAddOnCart={handleAddOnCart} handleDeleteItem={handleDeleteItem} isAdmin={isAdmin} one={"one4"} two={"two4"} />
        </div>
        <div className="aisle">
            <h1>Household</h1>
            <CardStack products={displayLaundry} handleAddOnCart={handleAddOnCart} handleDeleteItem={handleDeleteItem} isAdmin={isAdmin} one={"one5"} two={"two5"} />
        </div>
    </div>)

}

export default Home;