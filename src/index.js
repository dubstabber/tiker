import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Store from './store'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Upload from './pages/Upload/Upload'
import Settings from './pages/Settings/Settings'
import ModalDialog from './components/ModalDialog/ModalDialog'

import './App.css'

function App() {
  return (
    <HashRouter>
      <Store>
        <ModalDialog />
        <Header />
        <Switch>
          <Route path='/settings' component={Settings} />
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
