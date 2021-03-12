import styles from './notification.module.scss';

export const NOTIFICATION_TYPE = {
    SUCCESS: 'success',
    WARN: 'warn',
    ERROR: 'error'
};

export const Notification = ({ message, type }) => {
    const classes = [styles.notification, styles[type]].join(' ');
    return (<div className={classes}>{message}</div>);
};
