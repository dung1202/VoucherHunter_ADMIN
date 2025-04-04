import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkToken } from "./axios";
import { Helmet } from "react-helmet";
// import Topbar from "../src/component/topbar/Topbar";
import Topbar from "./component/topbar/Topbar"
// import Sidebar from "../src/component/sidebar/Sidebar";
import Sidebar from "./component/sidebar/Sidebar"

// import Home from "./pages/home/Home";
// import Home from "./pages/home/Home"

// import Login from "./pages/login/Login";
import Login from "./pages/login/Login"

// import User from "../src/pages/user/User";
import User from "./pages/user/User"
// import NewUser from "../src/pages/newuser/NewUser";
import NewUser from "./pages/newuser/NewUser"
// import UserList from "../src/pages/userList/UserList";
import UserList from "./pages/userList/UserList";

// import Product from "../src/pages/product/Product";
import Product from "./pages/product/Product"
// import NewProduct from "../src/pages/newpoduct/NewProduct";
import NewProduct from "./pages/newproduct/NewProduct"
// import ProductList from "../src/pages/productList/ProductList";
import ProductList from "./pages/productList/ProductList";

// import Profile from "./pages/profile/Profile";
// import Profile from "./pages/profile/Profile"

// import Messages from "./pages/Message/Messages";
// import Messages from "./pages/Message/Messages"

// import CrudNews from "./pages/news/newsDashBoards/crudNews";
import CrudNews from "./pages/news/newsDashBoards/crudNews"
// import EditorNews from "./pages/news/richTextEditor/editNews";
import EditorNews from "./pages/news/richTextEditor/editNews"
// import Editor from "./pages/news/richTextEditor/editor";
import Editor from "./pages/news/richTextEditor/editor"
// import Newsletter from "./pages/newsletter/Newsletter";
import Newsletter from "./pages/newsletter/Newsletter"

// import InvoiceList from "./pages/invoiceList/invoiceList";
import InvoiceList from "./pages/invoiceList/invoiceList"
// import Invoice from "./pages/invoice/invoice";
import Invoice from "./pages/invoice/invoice"

function App() {
  const [token, settoken] = useState(false);
  const [invoice, setinvoice] = useState("");
  const loginSuccess = (token) => {
    settoken(token);
    localStorage.setItem("accessToken", token);
  };
  const data = (tt) => {
    setinvoice(tt);
  };

  useEffect(() => {
    let e = localStorage.getItem("accessToken");
    if (e)
      checkToken(e)
        .then((res) => {
          // console.log(res.data)
          settoken(true);
        })
        .catch((err) => {
          // console.log(e)
          settoken(false);
        });
    // console.log(e)
  }, [token]);

  return (
    <Router>
      {!token ? (
        <Routes>
          <Route path="/" element={
            <>
              <Helmet><title>Login</title></Helmet>
              <Login dn={loginSuccess} />
            </>} />
        </Routes>
      ) : (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/" element={
                <div>
                  <Helmet><title>UserList</title></Helmet>
                  <UserList />
                </div>} />
              <Route path="/user/:id" element={<>
                <Helmet><title>User</title></Helmet>
                <User />
              </>} />
              <Route path="user/newuser" element={<>
                <Helmet><title>NewUser</title></Helmet>
                <NewUser />
              </>} />
              <Route path="/user" element={<>
                <Helmet><title>UserList</title></Helmet>
                <UserList />
              </>} />
              <Route path="/products/newproduct" element={<>
                <Helmet><title>NewProduct</title></Helmet>
                <NewProduct />
              </>} />
              <Route path="/products" element={<>
                <Helmet><title>ProductList</title></Helmet>
                <ProductList />
              </>} />
              <Route path="/product/:productId" element={<>
                <Helmet><title>Product</title></Helmet>
                <Product />
              </>} />
              {/* <Route path="/profile" element={<Profile />} /> 
              <Route path="/message" element={<Messages />} />*/}
              <Route path="/createnews" element={<>
                <Helmet><title>Create news</title></Helmet>
                <Editor />
              </>} />
              <Route
                path="/editor/:userId"
                element={<>
                  <Helmet><title>EditorNews</title></Helmet>
                  <EditorNews />
                </>}
              />
              <Route path="/newsdashboards" element={<>
                <Helmet><title>NewsDashboards</title></Helmet>
                <CrudNews />
              </>} />
              <Route path="/invoice" element={<>
                <Helmet><title>InvoiceList</title></Helmet>
                <InvoiceList chuyen={data} /></>} />
              <Route
                path="/invoiceDetail"
                element={
                  <>
                    <Helmet><title>Invoice</title></Helmet>
                    <Invoice lay={invoice} /></>}
              />
              <Route path="/newsletter" element={<>
                <Helmet><title>Newsletter</title></Helmet>
                <Newsletter />
              </>} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
