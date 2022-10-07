import './css/App.css';
import './css/formBox.css';
import Login from './components/Login'
import Home from './components/Home'
import AddForm from './components/AddForm';
import CreateUser from './components/CreateUser';
import { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import AccountInfo from './components/AccountInfo';
import Cart from './components/Cart';
import ComfirmationPage from './components/ConfirmationPage';
import Users from './components/Users';
import ForgotPassword from './components/ForgotPassword';

function App() {

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [onLog, setOnLog] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);


  const cartNum = cart.length !== 0 ? cart.length : 0;



  useEffect(() => {
    fetch('https://ishopping-app-database-server.herokuapp.com/users')
      .then(r => r.json())
      .then(data => setUsers(data))

    fetch('https://ishopping-app-database-server.herokuapp.com/products')
      .then(r => r.json())
      .then(data => setProducts(data))

    if (currentUser === null) {
      if (user === null) {
        fetch('https://ishopping-app-database-server.herokuapp.com/current')
          .then(r => r.json())
          .then(data => setUser(data))

      } else {
        console.log('hello')
        setCurrentUser(user[0].user)
        setOnLog(true)
      }
    }

    //If the user logged in has items in the cart then this will
    //render the items in the cart once the ocer logs in.
    if (cart.length === 0) {
      if (currentUser !== null) {
        if (currentUser.cart.length !== 0) {
          setTimeout(() => {
            setCart(currentUser.cart)
          }, 1000)
        }
      }
    }

    if (currentUser !== null) {
      if (currentUser.admin) {
        setIsAdmin(isAdmin => !isAdmin);
      } else {
        setIsAdmin(() => false);
      }
    }



    if (currentUser !== null) {
      setOnLog(true);
    }



  }, [currentUser])

  //This will return the user id when they log in
  function returnUserId(id) {
    setCurrentUser(users[id - 1])

    fetch('https://ishopping-app-database-server.herokuapp.com/current/1', {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(users[id - 1])
    })

  }

  //add items to the cart
  function handleAddOnCart(id) {
    const findProduct = products.find(item => { return item.id === id });

    const exists = cart.find(item => item.id === findProduct.id);

    if (exists) {
      setCart(cart => cart.map(item => {
        if (item.id === id) {
          return {
            ...item, "id": item.id,
            "productName": item.productName,
            "image": item.image,
            "productPrice": item.productPrice,
            "quantity": item.quantity + 1,
            "category": item.category
          }
        }
        return item;
      }))
    } else {
      setCart(cart => [...cart, findProduct]);
    }
  }


  //update cart in the server
  useEffect(() => {
    if (currentUser !== null) {
      fetch(`https://ishopping-app-database-server.herokuapp.com/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ "cart": cart })
      })
    }

  }, [cart])

  //delete item in cart
  function handleDelete(id) {
    const exists = cart.find(item => item.id === id);

    if (exists.quantity > 1) {
      if (exists) {
        setCart(cart => cart.map(item => {
          if (item.quantity !== 1) {
            if (item.id === id) {
              return {
                ...item, "id": item.id,
                "productName": item.productName,
                "image": item.image,
                "productPrice": item.productPrice,
                "quantity": item.quantity - 1,
                "category": item.category
              }
            }
          }
          return item;
        }))
      }
    } else {
      setCart(cart => cart.filter(item => {
        if (item.id !== id) {
          return item
        }
      }))
    }
  }

  function handlePlaceOrder() {
    setCart([]);
  }


  function handleAdmin(isChecked, id) {
    const findUser = users.find(user => { return user.id === parseInt(id) });

    fetch(`https://ishopping-app-database-server.herokuapp.com/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ "admin": isChecked })
    })

    if (findUser.admin !== true) {
      if (isChecked) {
        if (findUser) {
          setUsers(users => users.map(user => {
            if (user.id === findUser.id) {
              return {
                ...user, "id": user.id,
                "name": user.name,
                "address": user.address,
                "lastname": user.lastname,
                "username": user.username,
                "password": user.password,
                "cart": user.cart,
                "admin": isChecked,
                "login": user.login
              }
            }

            return user;
          }))
        }
      }
    } else {
      if (findUser) {
        if (!isChecked) {
          setUsers(users => users.map(user => {
            if (user.id === findUser.id) {
              return {
                ...user, "id": user.id,
                "name": user.name,
                "address": user.address,
                "lastname": user.lastname,
                "username": user.username,
                "password": user.password,
                "cart": user.cart,
                "admin": isChecked,
                "login": user.login
              }
            }

            return user;
          }))
        }
      }
    }
  }

  function handleDeleteItem(id) {
    const findItem = products.find(item => { return item.id === id });

    const filtered = products.filter(item => { return item.id === findItem.id });

    console.log(findItem)

    if (findItem) {
      fetch(`https://ishopping-app-database-server.herokuapp.com/products/${findItem.id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      })
        .then(setProducts(filtered))
    }
  }

  return (
    <div className="App">


      {onLog ?
        <Switch>
          <Route path="/addform" >
            <AddForm setProducts={setProducts} products={products} />
          </Route>
          <Route path="/accountinfo" >
            <AccountInfo currentUser={currentUser} isAdmin={isAdmin} />
          </Route>
          <Route path="/cart" >
            <Cart cart={cart} handleDelete={handleDelete} handlePlaceOrder={handlePlaceOrder} />
          </Route>
          <Route path="/home" >
            <Home currentUser={currentUser} products={products} handleAddOnCart={handleAddOnCart} cartNum={cartNum} isAdmin={isAdmin} handleDeleteItem={handleDeleteItem} setOnLog={setOnLog} />
          </Route>
          <Route path="/confirmation" >
            <ComfirmationPage currentUser={currentUser} />
          </Route>
          <Route path="/users" >
            <Users users={users} setUsers={setUsers} handleAdmin={handleAdmin} />
          </Route>
        </Switch> :
        <Switch>
          <Route path="/forgotpassword" >
            <ForgotPassword />
          </Route>
          <Route path="/createuser" >
            <CreateUser setCurrentUser={setCurrentUser} setOnLog={setOnLog} />
          </Route>
          <Route path="/">
            <Login users={users} returnUserId={returnUserId} />
          </Route>
        </Switch>
      }

    </div >
  );
}

export default App;