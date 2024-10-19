import React from 'react';
import { useTranslation } from 'react-i18next';

const HeaderSearch = () => {
    const { t } = useTranslation();

    return (
        <div id="search">
            <a id="btn-search-close" className="btn-search-close" aria-label="Close search form">
                <i className="icon-x"></i>
            </a>
            <form className="search-form" action="search-results-page.html" method="get">
                <input className="form-control" name="q" type="text" placeholder="Type & Search..." />
                <span className="text-muted">{t('navigation.startSearching')}</span>
            </form>
        </div>
    );
};

export default HeaderSearch;
