import React, { useState, useContext } from 'react';
import { AppContext } from '../../context';
import LoginDialog from './LoginDialog/LoginDialog';
import RegisterDialog from './RegisterDialog/RegisterDialog';

import './ModalDialog.styles.css';

const ModalDialog = () => {
  const [registerPage, setRegisterPage] = useState(false);
  const { showModalDialog, setShowModalDialog } = useContext(AppContext);

  const disableLogin = () => {
    setRegisterPage(false);
    setShowModalDialog(false);
  };

  const switchPage = () => {
    setRegisterPage((prev) => !prev);
  };

  if (showModalDialog) {
    return (
      <>
        <div onClick={disableLogin} className="modal-box"></div>
        <div className="box">
          {registerPage ? (
            <RegisterDialog switchPage={switchPage} />
          ) : (
            <LoginDialog switchPage={switchPage} />
          )}
        </div>
      </>
    );
  } else return <></>;
};

export default ModalDialog;
