import classes from './UserInfo.module.css';


const UserInfo = (props) => {

    return (
        <div className={classes.userInfo}>
            <h2 className={classes.name}> {props.name} </h2>
            <div className={classes.location}>
                <h3 className={classes.city}> {"country"},</h3>
                <h4 className={classes.city}>{"city"}</h4>
            </div>
            <p className={classes.status}> {props.status} </p>
        </div>
    );

};

export default UserInfo;