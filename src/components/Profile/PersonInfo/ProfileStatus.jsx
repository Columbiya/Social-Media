import classes from '../Profile.module.css';
import React, { useEffect, useState } from 'react';
import Preloader from '../../сommon/Preloader/Preloder';


const ProfileStatus = props => {;
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const onChangeInput = e => {
        setStatus(e.target.value);
    };

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    if (props.isStatusFetching) {
        return <Preloader insteadOf={'status'} />
    }
    
    return (
        <div>
            <p><b>Status:</b> </p>
            {editMode ?
                <input autoFocus={true} onChange={onChangeInput} onBlur={deactivateEditMode} className={classes.statusInput} value={status} type="text" /> :
                <span onDoubleClick={props.isOwner ? activateEditMode: null}>{props.status || 'no status at the time'}</span>
            }
        </div>
    );
}

export default ProfileStatus;

