import { useEffect, useRef, useState } from 'react';
import Preloader from '../../сommon/Preloader/Preloder';
import classes from '../Profile.module.css';
import ProfileDataForm from './ProfileDataForm';
import ProfileStatus from './ProfileStatus';
import cn from 'classnames';
import { FaCamera } from "react-icons/fa";
import { Button } from '../../сommon/FormControls/FormControls';

const PersonInfo = ({ profile, status, updateStatus, isOwner, savePhoto, updateProfile, isStatusFetching }) => {
    let [isFetching, setIsFetching] = useState(false);
    let [editMode, setEditMode] = useState(false);

    const onPhotoChange = async event => {
        setIsFetching(true);
        await savePhoto(event.target.files[0]);
        setIsFetching(false);
    };

    let photoWithFile = (
        <>
            <img className={classes.picture} alt="my avatar" src={profile.photos.large ? profile.photos.large : "https://pbs.twimg.com/profile_images/1285655593592791040/HtwPZgej.jpg"} />
            {isOwner &&
                <>
                    <input type={'file'} className={classes.hidden} onChange={onPhotoChange} id={'input-file'} />
                    <label htmlFor={'input-file'} className={classes.uploadNewPhoto}>
                        <FaCamera className={classes.uploadPhotoIcon} />
                    </label>
                </>}
        </>
    );

    return (
        <div className={classes.person}>
            <div className={cn(classes.pictureContainer, {[classes.hoverable]: isOwner})}>
                {isFetching ? <Preloader /> : photoWithFile}
            </div>
            <ProfileStatus status={status} isStatusFetching={isStatusFetching} updateStatus={updateStatus} isOwner={isOwner} />
            {editMode ? <ProfileDataForm updateProfile={updateProfile} setEditMode={setEditMode} initialValues={profile} profile={profile} /> :
            <ProfileData profile={profile} setEditMode={setEditMode} isOwner={isOwner} />}
        </div >
    );

};

const ProfileData = ({ profile, setEditMode, isOwner }) => {
    let [height, setHeight] = useState(0);
    let infoFooter = useRef(null);
    
    useEffect(() => {
        setHeight(infoFooter.current.clientHeight);
        infoFooter.current.style.height = infoFooter.current.clientHeight + 'px';
    }, []);

    const toggleShow = e => {
        const element = infoFooter.current;
        if (element.style.height.split('px')[0] === '0') {
            element.style.height = height + 'px';

            return;
        }

        element.style.height = 0;

    };
    return (
        <div className={classes.personInfo}>
            <header>
                <button onClick={toggleShow} className={cn(classes.personInfoShow)} type={'button'}>Показать информацию профиля</button>
            </header>
            <footer className={cn(classes.personInfoFooter)} ref={infoFooter} >
                <p><b className={classes.description}>Full name: </b>{profile.fullName}</p>
                <p><b className={classes.description}>About me: </b>{profile.aboutMe}</p>
                <p><b className={classes.description}>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}</p>
                {profile.lookingForAJob && <p><b className={classes.description}>My professional skills: </b>{profile.lookingForAJobDescription}</p>}
                <div>
                    <h3>Contacts: </h3>
                    {Object.keys(profile.contacts).map(key => (
                        <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                    ))}
                </div>
                {isOwner && <Button text={'Edit Profile'} onClick={setEditMode} />}
            </footer>

        </div>
    )
}

const Contacts = ({ contactTitle, contactValue }) => {
    return (
        <p><b className={classes.contact + " " + classes.description}>{contactTitle}</b>: <a className={classes.contactLink} href={contactValue} target="__blank">{contactValue}</a></p>
    );
};

export default PersonInfo;