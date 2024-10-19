const ContainerWrapper = (props) => {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className={props.col ? props.col : 'col-lg-12'}>
                        <div className="heading-text heading-line text-center">
                            <h4>{props.title}</h4>
                        </div>
                    </div>
                </div>
                {props.children}
            </div>
        </section>
    );
};

export default ContainerWrapper;
