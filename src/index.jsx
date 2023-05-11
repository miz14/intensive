import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store'

import Root from "./routes/Root"

import { RequireAuth } from './routes/RequireAuth'

import ServiceInfoPage from './routes/ServiceInfo';
import UploadPage from './routes/Upload'

import Login from './routes/Login'
import Register from './routes/Register';
import Traces from './routes/Traces';


//import './uikit/css/uikit.css';
import './uikit/css/uikit-rtl.css';
import './default_index.css'
import './index.css'
import './old_index.css'


import TEST from './routes/TEST';


const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Root />}>
        <Route index element={<ServiceInfoPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        <Route path="test" element={<UploadPage />} />
        <Route path='traces' element={
            <RequireAuth>
                <Traces/>
            </RequireAuth>
        }/>
        {/* <Route path='upload' element={
            <RequireAuth>
                <UploadPage/>
            </RequireAuth>
        } /> */}
    </Route>
));

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>

    </React.StrictMode>

)
