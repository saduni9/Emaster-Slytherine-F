import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
            <ToastContainer/>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
