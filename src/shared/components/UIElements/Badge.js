const Badge = (props) => {
    let badgeType;
    switch (props.type) {
        case 'success':
            badgeType = 'bg-success';
            break;
        case 'warning':
            badgeType = 'bg-warning';
            break;
        case 'danger':
            badgeType = 'bg-danger';
            break;
        case 'ligth':
            badgeType = 'bg-ligth';
            break;
        case 'dark':
            badgeType = 'bg-dark';
            break;
        case 'primary':
            badgeType = 'bg-primary';
            break;
        case 'secondary':
            badgeType = 'bg-secondary';
            break;
        case 'info':
            badgeType = 'bg-info';
            break;
        default:
            badgeType = 'bg-primary';
            break;
    }

    return <span className={`badge ${badgeType}`}>{props.children}</span>;
};

export default Badge;
