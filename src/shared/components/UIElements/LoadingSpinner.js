import React from 'react';
//import { useTranslation } from 'react-i18next';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
    //const { t } = useTranslation();

    return (
        <div style={{ width: '0%', margin: '0 auto', marginBottom: '100px' }}>
            <span className="loader"></span>
        </div>
    );
};

export default LoadingSpinner;
