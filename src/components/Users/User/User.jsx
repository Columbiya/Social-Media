import classes from './User.module.css';
import UserFollow from './UserFollow/UserFollow';
import UserInfo from './UserInfo/UserInfo';


const User = (props) => {
    return (
        <div className={classes.user}>
            <UserFollow followed={props.followed}
                        followingInProgress={props.followingInProgress}
                        photos={props.photos}
                        id={props.id}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        isAuthorized={props.isAuthorized} />
            <UserInfo name={props.name}
                      //location={props.location}
                      status={props.status} />
        </div>

    );
};

export default User;