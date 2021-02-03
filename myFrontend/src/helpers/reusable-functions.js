import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; /* CSS */

/*==========================================
 |            String Formatting            |
 ========================================*/
export const lowerCaseFirstLetter = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toLowerCase() + s.slice(1);
};

/*===========================================
 |            User Notifications            |
 =========================================*/
export const generateMessage = (type, message) => {
    toast[type](message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}