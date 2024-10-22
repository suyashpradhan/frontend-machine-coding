import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/*const link = React.createElement('a', {id: "link", "data-number": 20, href: "https://www.google.com"}, "Visit Link")
const containerDomElement = document.getElementById('#root');

const renderElement = (reactElement: any, containerDomElement: any) => {
    const domElement = document.createElement(reactElement.type);

    domElement.innerText = reactElement.children;
    for (const key in reactElement.props) {
        domElement.setAttribute(key, reactElement.props[key]);
    }

    containerDomElement.appendChild(domElement);
}

renderElement(link, containerDomElement)*/

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

