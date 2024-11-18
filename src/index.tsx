import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import {ThemeProvider} from "./ThemeContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import {ProductsPage} from "./components/Ecommerce/ProductsPage";
import {Product} from "./components/Ecommerce/Product";

/*
Building own React

const link = React.createElement('a', {id: "link", "data-number": 20, href: "https://www.google.com"}, "Visit Link")
const containerDomElement = document.getElementById('#root');

const renderElement = (reactElement: any, containerDomElement: any) => {
    const domElement = document.createElement(reactElement.type);

    domElement.innerText = reactElement.children;
    for (const key in reactElement.props) {
        domElement.setAttribute(key, reactElement.props[key]);
    }

    containerDomElement.appendChild(domElement);
}

renderElement(link, containerDomElement)


*/


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<App/>}></Route>
                    <Route path="/products" element={<ProductsPage/>}></Route>
                    <Route path="/products/:id" element={<Product/>}/>
                    <Route path="*" element={<h1>404 Not found</h1>}></Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

