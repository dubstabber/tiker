import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/authState';
import DialogState from './context/auth/dialogState';
import HomeState from './context/home/homeState';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';
import Settings from './pages/Settings/Settings';
import ModalDialog from './components/ModalDialog/ModalDialog';
import PostDialog from './components/PostDialog/PostDialog';

import './App.css';

function App() {
  return (
    <HashRouter>
      <AuthState>
        <DialogState>
          <ModalDialog />
          <PostDialog />
          <Header />
          <Switch>
            <Route path="/settings" component={Settings} />
            <Route path="/upload" component={Upload} />
            <HomeState>
              <Route path="/" component={Home} />
            </HomeState>
          </Switch>
        </DialogState>
      </AuthState>
    </HashRouter>
  );
}

export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
