import StarRating from '../../../shared/components/UIElements/StarRating';

import { useTranslation } from 'react-i18next';

const ProductReviewsElement = (props) => {
    const { t } = useTranslation();

    return (
        <div className="comment" id="comment-{props.id}">
            <div className="image">
                <img
                    loading="lazy"
                    alt=""
                    src={props.avatar ? props.avatar : 'https://dexmate-shop.s3.eu-west-3.amazonaws.com/author.webp'}
                    className="avatar"
                />
            </div>
            <div className="text">
                <StarRating rating={props.rating} />
                <h5 className="name">{props.username.length > 0 ? props.username : t('system.anonymous')}</h5>
                <span className="comment_date">{props.created}</span>
                <div className="text_holder">
                    <p>{props.review}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductReviewsElement;
