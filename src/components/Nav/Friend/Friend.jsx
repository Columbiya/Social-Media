import classes from './Friend.module.css';
import smile from '../../../assets/images/smile.jpg';

const Friend = (props) => {
    return (
        <div className={classes.friend}>
            <img src={smile} className={classes.picture} alt="Your friend" />
            <p>{props.name}</p>
        </div>
    );
};

export default Friend;