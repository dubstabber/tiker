import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Store from './store'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Upload from './pages/Upload/Upload'

import './App.css'

function App() {
  return (
    <HashRouter>
      <Store>
        <Header />
        <Switch>
          <Route path='/upload' component={Upload} />
          <Route path='/' component={Home} />
        </Switch>
      </Store>
    </HashRouter>
  );
}

export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
