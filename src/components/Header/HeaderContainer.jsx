import React from 'react';
import { logout } from '../../redux/auth-reducer';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuthorizedUserProfilePhoto, getIsAuthorized, getLogin } from '../../redux/selectors/auth-selectors';
import { compose } from 'redux';
import { withRouter } from 'react-router';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = state => ({
    isAuthorized: getIsAuthorized(state),
    login: getLogin(state),
    profilePhoto: getAuthorizedUserProfilePhoto(state)
});

export default compose(
    connect(mapStateToProps, { logout }),
    withRouter,
)(HeaderContainer)