const StarRating = (props) => {
    return (
        <div className="product-rate">
            {props.rating > 0 ? <i className="fa fa-star"></i> : <i className="fa fa-star-half-o"></i>}
            {props.rating > 1 ? <i className="fa fa-star"></i> : <i className="fa fa-star-half-o"></i>}
            {props.rating > 2 ? <i className="fa fa-star"></i> : <i className="fa fa-star-half-o"></i>}
            {props.rating > 3 ? <i className="fa fa-star"></i> : <i className="fa fa-star-half-o"></i>}
            {props.rating > 4 ? <i className="fa fa-star"></i> : <i className="fa fa-star-half-o"></i>}
        </div>
    );
};

export default StarRating;
