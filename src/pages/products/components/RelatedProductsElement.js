import ProductSmallItem from '../../../shared/components/UIElements/Products/ProductSmallItem';

const RelatedProductsElements = (props) => {
    return (
        <div className="col-lg-4" style={{ marginBottom: '15px' }}>
            <div className="widget-shop">
                <ProductSmallItem
                    key={props.id}
                    id={props.id}
                    images={props.images}
                    category={props.category}
                    rating={props.rating}
                    title={props.title}
                    price={props.price}
                />
            </div>
        </div>
    );
};

export default RelatedProductsElements;
