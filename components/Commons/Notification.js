// styles
import styles from './notification.module.scss';

export const NOTIFICATION_TYPE = {
    SUCCESS: 'success',
    WARN: 'warn',
    ERROR: 'error'
};

export const Notification = ({ message, type, visible }) => {
    const classes = [styles.notification, styles[type]].join(' ');
    return (visible ? <div className={classes}>{message}</div> : null);
};
