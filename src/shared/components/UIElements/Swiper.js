// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

//https://swiperjs.com/react
//https://swiperjs.com/demos
const aa = (props) => {
    return (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {props.images.map((image) => (
                <SwiperSlide key={process.env.REACT_APP_AWS_S3_URL_BASE + image}>
                    <img
                        loading="lazy"
                        alt="Carrousel product"
                        width="1921"
                        height="798"
                        src={process.env.REACT_APP_AWS_S3_URL_BASE + image}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default aa;
