const PageHeader = (props) => {
    return (
        <section id="page-title">
            <div className="container">
                <div className="page-title">
                    <h1>{props.title}</h1>
                    {props.description && <span>{props.description}</span>}
                </div>
            </div>
        </section>
    );
};

export default PageHeader;
