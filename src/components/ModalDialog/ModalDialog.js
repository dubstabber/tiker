import React, { useState, useContext } from 'react';
import DialogContext from '../../context/dialog/dialogContext';
import LoginDialog from './LoginDialog/LoginDialog';
import RegisterDialog from './RegisterDialog/RegisterDialog';

import './ModalDialog.styles.css';

const ModalDialog = () => {
  const [registerPage, setRegisterPage] = useState(false);
  const dialogContext = useContext(DialogContext);

  const disableLogin = () => {
    setRegisterPage(false);
    dialogContext.closeDialog();
  };

  const switchPage = () => {
    setRegisterPage((prev) => !prev);
  };

  if (dialogContext.modalDialog) {
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
