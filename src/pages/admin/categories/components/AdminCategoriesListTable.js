import { useTranslation } from 'react-i18next';
import Table from '../../../../shared/components/UIElements/Table';
import Badge from '../../../../shared/components/UIElements/Badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import axiosInterceptor from '../../../../shared/util/axiosInterceptor';

const AdminCategoriesListTable = (props) => {
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState(props.categories);

    const deleteCategoryHandler = (event, categoryId) => {
        //console.log(categoryId);

        axios
            .delete(`${process.env.REACT_APP_API_BASE_URL}/api/categories/admin/delete-category/${categoryId}`)
            .then((response) => {
                //console.log('Haciendo petición a la API - Borrando category con ID: ' + categoryId);
                setCategories(categories.filter((category) => category.id !== categoryId));
            })
            .catch((error) => {
                if (error?.code === 404 || error?.code === 500) {
                    alert.show('Something went wrong');
                } else if (error?.code === 401) {
                    alert.show('Unauthorized');
                } else if (error?.code) {
                    alert.show(error.code + ' - ' + error.message);
                } else {
                    // TO DO: Mirar el error "Canceling last request."
                    //console.log(error);
                    // alert.show(t('system.somethingWentWrong'))
                }
            });
    };

    const columns = ['', t('products.title'), t('navigation.products'), t('products.sells'), t('system.actions')];

    return (
        <Table
            columns={columns}
            fields={categories.map((category) => {
                return [
                    <tr key={category.id}>
                        <td>
                            <img
                                loading="lazy"
                                alt={category.name[0][i18n.resolvedLanguage]}
                                src={
                                    category.image.length > 0
                                        ? process.env.REACT_APP_AWS_S3_URL_BASE + category.image[0]
                                        : ''
                                }
                                style={{ maxHeight: '30px' }}
                            />
                        </td>
                        <td>{category.name[0][i18n.resolvedLanguage]}</td>
                        <td>{category.numberOfProducts}</td>
                        <td>
                            {category.sells} {process.env.REACT_APP_CURRENCY}
                        </td>
                        <td>
                            <span style={{ marginLeft: '3px', marginRight: '3px' }}>
                                <Link to={`/products/category/${category.id}`}>
                                    <Badge>
                                        <i className="icon-eye"></i>
                                    </Badge>
                                </Link>
                            </span>
                            <span style={{ marginLeft: '3px', marginRight: '3px' }}>
                                <Link to={`/admin/categories/edit/${category.id}`}>
                                    <Badge>
                                        <i className="icon-edit"></i>
                                    </Badge>
                                </Link>
                            </span>
                            <span
                                style={{ marginLeft: '3px', marginRight: '3px' }}
                                onClick={(event) => deleteCategoryHandler(event, category.id)}
                            >
                                <Badge id={category.id}>
                                    <i className="icon-trash-2"></i>
                                </Badge>
                            </span>
                        </td>
                    </tr>,
                ];
            })}
        />
    );
};

export default AdminCategoriesListTable;
