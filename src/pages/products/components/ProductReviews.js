import { useTranslation } from 'react-i18next';
import ProductReviewsElement from './ProductReviewsElement';

const ProductReviews = (props) => {
    const { t } = useTranslation();

    return (
        <div className="comments" id="comments">
            <div className="comment_number">
                {t('products.reviews')} <span>({props.num_comments})</span>
            </div>
            <div className="comment-list">
                {props.comments.map((comment) => (
                    <ProductReviewsElement
                        key={comment.id}
                        id={comment.id}
                        rating={comment.rating}
                        created={comment.created}
                        review={comment.review}
                        username={comment.username}
                        avatar={comment.avatar}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductReviews;
