import DataTable from 'react-data-table-component';
// https://react-data-table-component.netlify.app/?path=/story/getting-started-examples--page
// https://www.npmjs.com/package/react-data-table-component

/*
const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]
*/

// TO DO - TRANSLATE
const CustomDatatable = (props) => {
    return <DataTable columns={props.columns} data={props.data} selectableRows />;
};

export default CustomDatatable;
