import classes from './../..//Dialogs.module.css';
import smile from '../../../../assets/images/smile.jpg';

const Picture = props => {
        return (
            <img src={props.fromMe ? props.profilePhoto: smile} className={classes.picture} alt="user"/>
        )
};

export default Picture;