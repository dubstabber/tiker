import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import DialogContext from '../../context/dialog/dialogContext';
import LoginDialog from './LoginDialog/LoginDialog';
import RegisterDialog from './RegisterDialog/RegisterDialog';

import './ModalDialog.styles.css';

const ModalDialog = () => {
  const authContext = useContext(AuthContext);
  const dialogContext = useContext(DialogContext);

  const closeDialog = () => {
    dialogContext.closeModalDialog();
    authContext.clearErrors();
  };

  if (dialogContext.modalDialog) {
    return (
      <>
        <div onClick={closeDialog} className="modal-box"></div>
        <div className="box">
          {dialogContext.registerPage ? <RegisterDialog /> : <LoginDialog />}
        </div>
      </>
    );
  } else return <></>;
};

export default ModalDialog;
