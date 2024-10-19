const Table = (props) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="thead-light">
                    <tr>
                        {props.columns.map((column) => {
                            return (
                                <th scope="col" key={column}>
                                    {column}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>{props.fields}</tbody>
            </table>
        </div>
    );
};

export default Table;
