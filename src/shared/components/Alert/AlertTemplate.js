import React from 'react';
// import InfoIcon from './icons/InfoIcon'
// import SuccessIcon from './icons/SuccessIcon'
// import ErrorIcon from './icons/ErrorIcon'
// import CloseIcon from './icons/CloseIcon'

/*
const alertStyle = {
    backgroundColor: '#151515',
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '300px',
    boxSizing: 'border-box'
}

const buttonStyle = {
    marginLeft: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
}
        */

/*
return (
        <div style={{ ...alertStyle, ...style }}>
            {options.type === 'info' && <InfoIcon />}
            {options.type === 'success' && <SuccessIcon />}
            {options.type === 'error' && <ErrorIcon />}
            <span style={{ flex: 2 }}>{message}</span>
            <button onClick={close} style={buttonStyle}>
                <CloseIcon />
            </button>
        </div>
    )
    




    <div style={{ ...alertStyle, ...style }}>
            <span style={{ flex: 2 }}>{message}</span>
            <button onClick={close} style={buttonStyle}>
                X
            </button>
        </div>

    
        switch (options.type) {
        case 'primary':
            alertType = 'alert-primary'
            break;
        case 'secondary':
            alertType = 'alert-secondary'
            break;
        case 'success':
            alertType = 'alert-success'
            break;
        case 'danger':
            alertType = 'alert-danger'
            break;
        case 'warning':
            alertType = 'alert-warning'
            break;
        case 'info':
            alertType = 'alert-info'
            break;
        case 'light':
            alertType = 'alert-light'
            break;
        case 'dark':
            alertType = 'alert-dark'
            break;
        default:
            alertType = 'alert-danger'
            break;
    }

    */

const AlertTemplate = ({ message, options, style, close }) => {
    let alertType = 'alert-danger';

    // TO DO: Fix this
    if (options.type === 'info') {
        alertType = 'alert-info';
    } else if (options.type === 'success') {
        alertType = 'alert-success';
    } else if (options.type === 'error') {
        alertType = 'alert-danger';
    } else {
        alertType = 'alert-danger';
    }

    //${options.type === 'info' ? 'alert-info' : 'alert-danger' }

    return (
        <div className={`alert alert-danger alert-dismissible fade show`} role="alert">
            {message}
            <button
                onClick={close}
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
};

export default AlertTemplate;
