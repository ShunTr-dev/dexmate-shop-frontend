import React from 'react';
import { useTranslation } from 'react-i18next';

const HeaderExtras = () => {
    const { i18n } = useTranslation();

    return (
        <div className="header-extras">
            <ul>
                <li>
                    <div className="p-dropdown">
                        <a href="#">
                            <i className="icon-globe"></i>
                            <span>
                                {i18n.resolvedLanguage === 'en' && 'EN'}
                                {i18n.resolvedLanguage === 'es' && 'ES'}
                            </span>
                        </a>
                        <ul className="p-dropdown-content">
                            <li key="English">
                                <span
                                    style={{
                                        lineHeight: '26px',
                                        whiteSpace: 'nowrap',
                                        display: 'block',
                                        padding: '2px 8px',
                                    }}
                                    onClick={() => i18n.changeLanguage('en')}
                                >
                                    English
                                </span>
                            </li>
                            <li key="Español">
                                <span
                                    style={{
                                        lineHeight: '26px',
                                        whiteSpace: 'nowrap',
                                        display: 'block',
                                        padding: '2px 8px',
                                    }}
                                    onClick={() => i18n.changeLanguage('es')}
                                >
                                    Spanish
                                </span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default HeaderExtras;
