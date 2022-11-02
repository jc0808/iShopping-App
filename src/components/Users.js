import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Users({ users, handleAdmin, setUsers }) {

    const [checked, setChecked] = useState(false);

    const backStyle = {
        "color": "blue",
        "marginLeft": "-520px"
    };

    function handleClick(e) {
        setChecked(checked => !checked);
        handleAdmin(checked, e.target.id);

    }

    function handleDelete(e) {
        const findUser = users.find(user => { return user.id === parseInt(e.target.id) });

        const filtered = users.filter(user => { return user.id !== findUser.id });

        if (findUser) {
            fetch(`https://ishopping-app-server.herokuapp.com/users/${findUser.id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(setUsers(filtered))
        }
    }


    const filtered = users.filter(user => { return user.id !== 1 });

    const displayUsers = filtered.map(user => {
        return (<tr key={user.id} >
            <td style={{ color: "yellow" }}>{user.name}</td>
            <td style={{ color: "yellow" }}>{user.lastname}</td>
            <td style={{ color: "yellow" }}>{user.username}</td>
            <td style={{ color: "yellow" }}>
                <label className="checkAdmin" id={user.id} onClick={handleClick}>{!user.admin ? "MAKE ADMIN" : "REMOVE"}</label></td>
            <td style={{ color: "red", fontWeight: "bold", cursor: "pointer" }} id={user.id} onClick={handleDelete}>X</td>
        </tr>)
    })
    return (
        <div id="usersBox">
            <div><NavLink to="/home" style={backStyle}>Back</NavLink></div>

            <h2>List of Current Users</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Username</th>
                        <th>Admin</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers}
                </tbody>


            </table>


        </div>
    )
};

export default Users;
