import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Notification = (value) =>{
    return toast(value.text,{
        type: value.type
    })
}