import FrontPageAtroposHeader from '../../shared/components/UIElements/FrontPageAtroposHeader';
import HomePageGetter from './components/HomePageGetter';

const HomePage = () => {
    return (
        <>
            <FrontPageAtroposHeader />
            <HomePageGetter url={`${process.env.REACT_APP_API_BASE_URL}/api/products/homeProducts`} />
        </>
    );
};

export default HomePage;
