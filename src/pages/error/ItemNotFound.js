const ItemNotFound = (props) => {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading-text heading-line text-center">
                            <h4>{props.title}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemNotFound;
