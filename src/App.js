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
    fetch('http://localhost:4000/users')
      .then(r => r.json())
      .then(data => setUsers(data))

    fetch('http://localhost:4000/products')
      .then(r => r.json())
      .then(data => setProducts(data))

    if (currentUser === null) {
      if (user === null) {
        fetch('http://localhost:4000/current')
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

    fetch('http://localhost:4000/current/1', {
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
      fetch(`http://localhost:4000/users/${currentUser.id}`, {
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

    fetch(`http://localhost:4000/users/${id}`, {
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
      fetch(`http://localhost:4000/products/${findItem.id}`, {
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
            <Home currentUser={currentUser} products={products} handleAddOnCart={handleAddOnCart} cartNum={cartNum} isAdmin={isAdmin} handleDeleteItem={handleDeleteItem} />
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


// const [userInfo, setUserInfo] = useState([]);

// const [currentUser, setCurrentUser] = useState(null);

// const currentLocation = useLocation().pathname;

// const [products, setProducts] = useState([]);

// const [cart, setCart] = useState([]);

// const [c, setC] = useState([...cart]);

// //currentUser !== null ? currentUser.cart.length : 0;

// useEffect(() => {
//   fetch('http://localhost:4000/users')
//     .then(r => r.json())
//     .then(data => setUserInfo(data))

//   fetch('http://localhost:4000/products')
//     .then(r => r.json())
//     .then(data => setProducts(data))

// }, [])

// function returnUserId(id) {
//   userInfo.forEach(user => {
//     if (user.id === id) {
//       setCurrentUser(userInfo[id - 1])
//     }
//   })
// }


// function returnUsername(username) {
//   userInfo.forEach(user => {
//     if (user.username === username) {
//       setCurrentUser(userInfo[user.id - 1])
//     }
//   })
// }

// function location() {
//   if (currentLocation === "/createuser") {
//     return (<Route path="/CreateUser">
//       <CreateUser returnUsername={returnUsername} />
//     </Route>)
//   } else {
//     return (<Login user={userInfo} returnUserId={returnUserId} />)
//   }
// }

// setTimeout(() => {

//   if (currentUser !== null) {
//     setCart(currentUser.cart)
//   }
// }, 200)

// function handleAddOnCart(name, image, price) {

//   const newCartProduct = {
//     "name": name,
//     "image": image,
//     "price": price,
//     "quantity": 1
//   };


//   if (!c.includes(newCartProduct)) {
//     setC([...c, newCartProduct])
//     console.log(newCartProduct)
//   }


// }

// useEffect(() => {
//   if (currentUser !== null) {

//     fetch(`http://localhost:4000/users/${currentUser.id}`, {
//       method: "PATCH",
//       headers: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify({ cart: c })
//     })
//       .then(r => r.json())
//       .then(d => {
//         setCurrentUser(d);

//       })

//     // const update = userInfo.map(user => {
//     //   if (user.id === currentUser.id) {
//     //     return user
//     //   } else {
//     //     return user
//     //   }
//     // });

//     // setUserInfo(update);
//   }


// }, [c])

// return (
//   <div className="App">

//     {currentUser !== null ?
//       <Switch>
//         <Route path="/addform" >
//           <AddForm />
//         </Route>
//         <Route path="/accountinfo" >
//           <AccountInfo currentUser={currentUser} />
//         </Route>
//         <Route path="/cart" >
//           <Cart cart={cart} />
//         </Route>
//         <Route path="/" >
//           <Home currentUser={currentUser} products={products} handleAddOnCart={handleAddOnCart} cartNum={cart} />
//         </Route>
//       </Switch> :
//       location()
//     }
//   </div >
// );
// }

// export default App;
