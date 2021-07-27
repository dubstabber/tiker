import React, { useState, useContext } from 'react';
import DialogContext from '../../context/dialog/dialogContext';
import LoginDialog from './LoginDialog/LoginDialog';
import RegisterDialog from './RegisterDialog/RegisterDialog';

import './ModalDialog.styles.css';

const ModalDialog = () => {
  const dialogContext = useContext(DialogContext);

  const disableLogin = () => {
    dialogContext.closeDialog();
  };

  if (dialogContext.modalDialog) {
    return (
      <>
        <div onClick={disableLogin} className="modal-box"></div>
        <div className="box">
          {dialogContext.registerPage ? <RegisterDialog /> : <LoginDialog />}
        </div>
      </>
    );
  } else return <></>;
};

export default ModalDialog;
