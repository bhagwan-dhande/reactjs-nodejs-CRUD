import { toast } from 'react-toastify';

function Toast({ toastType, message }) {
    return toast(message, {
        position: "top-right",
        type: toastType,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
    });
}

export default Toast;