const Alert = (props) => {
    let alertType = '';

    switch (props.alertType) {
        case 'primary':
            alertType = 'alert-primary';
            break;
        case 'secondary':
            alertType = 'alert-secondary';
            break;
        case 'success':
            alertType = 'alert-success';
            break;
        case 'danger':
            alertType = 'alert-danger';
            break;
        case 'warning':
            alertType = 'alert-warning';
            break;
        case 'info':
            alertType = 'alert-info';
            break;
        case 'light':
            alertType = 'alert-light';
            break;
        case 'dark':
            alertType = 'alert-dark';
            break;
        default:
            alertType = 'alert-primary';
            break;
    }

    return (
        <div
            className={`alert ${alertType} alert-dismissible fade show`}
            role="alert"
            style={{ position: 'fixed', bottom: '15px', right: '15px' }}
        >
            {props.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
};

export default Alert;
