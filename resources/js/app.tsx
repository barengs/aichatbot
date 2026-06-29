import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import AppRoutes from './AppRoutes';

const el = document.getElementById('app');
if (el) {
    const root = createRoot(el);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
