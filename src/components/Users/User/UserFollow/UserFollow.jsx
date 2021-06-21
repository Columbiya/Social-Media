import classes from './UsersFollow.module.css';
import picture from './../../../../assets/images/smile.jpg';
import { NavLink } from 'react-router-dom';
import { Button } from '../../../сommon/FormControls/FormControls';

const UserFollow = (props) => {
    let isFollowingFree = props.isAuthorized && !props.followingInProgress;
    let followAction = props.followed ? () => props.unfollow(props.id) : () => props.follow(props.id);
    let followingText = props.followed ? "Unfollow" : "Follow";

    return (
        <div className={classes.userLeft}>
            <NavLink to={"/profile/" + props.id} >
                <img className={classes.picture} src={props.photos.small != null ? props.photos.small : picture} alt="person in the box" />
            </NavLink>

            {props.isAuthorized &&
            <Button text={!props.followingInProgress ? followingText : "...."} className={classes.noMargin} onClick={isFollowingFree ? followAction : null} />}

        </div>
    );

};

export default UserFollow;