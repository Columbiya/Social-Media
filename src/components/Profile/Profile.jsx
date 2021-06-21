import React from 'react';
import Preloader from '../сommon/Preloader/Preloder';
import PersonInfo from './PersonInfo/PersonInfo';
import MyPostsContainer from './Posts/MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import coverImg from '../../assets/images/Profile/cover-img.jpg';


const Profile = props => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <>
            <div className={classes.image}>
                <img src={coverImg} alt=""/>
            </div>
            <PersonInfo updateProfile={props.updateProfile} 
                        profile={props.profile} 
                        isOwner={props.isOwner} 
                        savePhoto={props.savePhoto} 
                        status={props.status} 
                        updateStatus={props.updateStatus}
                        isStatusFetching={props.isStatusFetching}/>
            <MyPostsContainer isOwner={props.isOwner} />
        </>
    );
};

export default Profile;