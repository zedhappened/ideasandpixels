import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'

import App from './App';
import store from './app/store'

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


