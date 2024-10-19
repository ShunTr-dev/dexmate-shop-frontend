const SubmitButton = (props) => {
    return (
        <button type={props.type} className="btn btn-primary btn-block btn-primary">
            {props.loading && (
                <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: '5px' }}
                >
                    {' '}
                </span>
            )}
            {props.title}
        </button>
    );
};

export default SubmitButton;
