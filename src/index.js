import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';

import './app/style/index.css';
import App from './app/App.tsx';
import { projectReducer } from './entities/reducers/projects.tsx';
import { sidebarReducer } from './entities/reducers/sidebar.tsx';
import { taskReducer } from './entities/reducers/tasks.tsx';


const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
    sidebar: sidebarReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(thunk)
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// export default store;
