import { useContext } from 'react';
import NotificationStore from './NotificationProvider';

const useNotification = () => useContext(NotificationStore);

export default useNotification;
