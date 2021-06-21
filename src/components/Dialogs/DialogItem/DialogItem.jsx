import classes from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import smile from '../../../assets/images/smile.jpg';


const DialogItem = (props) => {
    
    return (
        <NavLink className={classes.dialog} activeClassName={classes.active} to={"/dialogs/" + props.id}>
            <img src={smile} className={classes.dialogPicture} alt="user" />
            {props.name}
        </NavLink>
    );
};

export default DialogItem;