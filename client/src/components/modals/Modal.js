import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal-root');

const styles = {
  width: '100vw',
  height: '100vh',
  background: 'white',
  position: 'fixed',
  top: 0,
  left: 0,
};

const Background = ({children}) => <div style={styles}>{children}</div>;

const Modal = ({isOpen, close, children}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(<Background>{children}</Background>, portalRoot);
};

export default Modal;
