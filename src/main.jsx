import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Components_4/09_HomeQuizeApp/store/index.jsx'
import store2 from './Components_5/06_InfiniteScrolling/redux/store2.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider 
     
    //  store={store}
    store={store2}    
     
     
     >
      <App />
    </Provider>
  </React.StrictMode>
)
