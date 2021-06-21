import React from 'react';
import User from './User/User';
import classes from './Users.module.css';
import Paginator from '../сommon/Paginator/Paginator';

const Users = ({totalCount, usersPerPage, page, switchPage, users, ...props}) => {
    let usersArray = users.map(user => <User name={user.name}
                                            //location={user.location} 
                                            status={user.status}
                                            followed={user.followed}
                                            followingInProgress={props.followingInProgress}
                                            photos={user.photos}
                                            id={user.id}
                                            key={user.id}
                                            follow={props.follow}
                                            unfollow={props.unfollow}
                                            isAuthorized={props.isAuthorized} />);

    return (
        <div className={classes.users}>
            <Paginator totalCount={totalCount} perPage={usersPerPage} page={page} switchPage={switchPage} />
            {usersArray}
        </div>
    )
};

export default Users;

