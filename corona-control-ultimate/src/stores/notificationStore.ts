import { create } from 'zustand';

export type NotificationType = 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';

export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    duration: number;
}

interface NotificationStore {
    notifications: Notification[];
    addNotification: (message: string, type?: NotificationType, duration?: number) => void;
    removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    addNotification: (message, type = 'INFO', duration = 5000) => {
        const id = Math.random().toString(36).substring(7);
        const newNotification = { id, message, type, duration };
        
        set((state) => ({
            notifications: [...state.notifications, newNotification]
        }));

        if (duration > 0) {
            setTimeout(() => {
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id)
                }));
            }, duration);
        }
    },
    removeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
        }));
    }
}));
