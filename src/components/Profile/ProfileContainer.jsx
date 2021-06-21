import { compose } from 'redux';
import React, { useEffect } from 'react';
import { getProfile, getStatus, updateStatus, savePhoto, updateProfile, setStatusFetching } from '../../redux/profile-reducer';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { getUserStatus, getUserProfile, getIsStatusFetching } from '../../redux/selectors/profile-selectors';
import { getIsAuthorized, getMyId } from '../../redux/selectors/auth-selectors';

const ProfileContainer  = props => {
    let userId = props.match.params.userId;

    useEffect(() => {
        const refreshProfile = async () => {
            if (!userId) {
                userId = props.myId;
                
                if (!userId) {
                    props.history.push('/login');
                    return;
                }

                props.getProfile(userId);

                props.setStatusFetching(true);
                await props.getStatus(userId);
                props.setStatusFetching(false);
                return;
            }

            props.getStatus(userId);
            props.getProfile(userId);
            
        }

        refreshProfile();
    }, [userId])

    return (
        <Profile {...props} isOwner={!props.match.params.userId} />
    );
}

const mapStateToProps = state => ({
    profile: getUserProfile(state),
    myId: getMyId(state),
    status: getUserStatus(state),
    isAuthorized: getIsAuthorized(state),
    isStatusFetching: getIsStatusFetching(state)
});

export default compose(
    connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, updateProfile, setStatusFetching }),
    withRouter,
)(ProfileContainer);