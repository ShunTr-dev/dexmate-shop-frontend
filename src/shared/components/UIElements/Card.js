const Card = (props) => {
    return (
        <div className="card">
            <div className="card-body p-4">{props.children}</div>
        </div>
    );
};

export default Card;
