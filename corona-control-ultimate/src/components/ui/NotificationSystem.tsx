import React from 'react';
import { useNotificationStore, Notification } from '@/stores/notificationStore';
import './NotificationSystem.css';

/**
 * UI-014: NotificationSystem
 * Displays temporary alerts and info messages.
 */
export const NotificationSystem: React.FC = () => {
    const { notifications, removeNotification } = useNotificationStore();

    return (
        <div className="notification-container">
            {notifications.map((n) => (
                <div 
                    key={n.id} 
                    className={`notification-item ${n.type.toLowerCase()}`}
                    onClick={() => removeNotification(n.id)}
                >
                    <div className="notification-icon">
                        {n.type === 'ALERT' && '⚠️'}
                        {n.type === 'WARNING' && '🔸'}
                        {n.type === 'SUCCESS' && '✓'}
                        {n.type === 'INFO' && 'ℹ️'}
                    </div>
                    <div className="notification-content">
                        <div className="notification-message">{n.message}</div>
                    </div>
                    <div className="notification-close">×</div>
                </div>
            ))}
        </div>
    );
};

export default NotificationSystem;
