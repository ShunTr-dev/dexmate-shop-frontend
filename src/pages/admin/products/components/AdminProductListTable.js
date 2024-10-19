import { useTranslation } from 'react-i18next';
import Table from '../../../../shared/components/UIElements/Table';
import Badge from '../../../../shared/components/UIElements/Badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import axiosInterceptor from '../../../../shared/util/axiosInterceptor';

const AdminProductsListTable = (props) => {
    const { t, i18n } = useTranslation();
    const [products, setProducts] = useState(props.products);

    const deleteProductHandler = (event, productId) => {
        //console.log(productId);

        axios
            .delete(`${process.env.REACT_APP_API_BASE_URL}/api/products/admin/delete-product/${productId}`)
            .then((response) => {
                //console.log('Haciendo petición a la API - Borrando producto con ID: ' + productId);
                setProducts(products.filter((product) => product.id !== productId));
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

    const columns = [
        '',
        t('products.title'),
        t('cart.price'),
        t('products.rating'),
        t('system.visible'),
        t('products.stock'),
        t('products.sells'),
        t('products.views'),
        t('system.actions'),
    ];

    return (
        <Table
            columns={columns}
            fields={products.map((product) => {
                return [
                    <tr key={product.id}>
                        <td>
                            <img
                                loading="lazy"
                                alt={product.title[0][i18n.resolvedLanguage]}
                                width="380"
                                height="507"
                                src={
                                    product.images.length > 0
                                        ? process.env.REACT_APP_AWS_S3_URL_BASE + product.images[0]
                                        : ''
                                }
                                style={{ maxHeight: '30px', display: 'block', width: '100%', height: '100%' }}
                            />
                        </td>
                        <td>{product.title[0][i18n.resolvedLanguage]}</td>
                        <td>
                            {product.price} {process.env.REACT_APP_CURRENCY}
                        </td>
                        <td>{product.rating}</td>
                        <td>
                            {product.visible && <Badge type="success">{t('system.visible')}</Badge>}
                            {!product.visible && <Badge type="danger">{t('system.hidden')}</Badge>}
                        </td>
                        <td>{product.stock}</td>
                        <td>
                            {product.sells} {process.env.REACT_APP_CURRENCY}
                        </td>
                        <td>{product.views}</td>
                        <td>
                            <span style={{ marginLeft: '3px', marginRight: '3px' }}>
                                <Link to={`/products/${product.id}`}>
                                    <Badge>
                                        <i className="icon-eye"></i>
                                    </Badge>
                                </Link>
                            </span>
                            <span style={{ marginLeft: '3px', marginRight: '3px' }}>
                                <Link to={`/admin/products/edit/${product.id}`}>
                                    <Badge>
                                        <i className="icon-edit"></i>
                                    </Badge>
                                </Link>
                            </span>
                            <span
                                style={{ marginLeft: '3px', marginRight: '3px' }}
                                onClick={(event) => deleteProductHandler(event, product.id)}
                            >
                                <Badge id={product.id}>
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

export default AdminProductsListTable;
