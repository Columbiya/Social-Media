import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { follow, unfollow, requestUsers } from './../../redux/users-reducer';
import Preloader from '../сommon/Preloader/Preloder';
import { compose } from 'redux';
import { getFollowingInProgress,
         getIsFetching,
         getPage, 
         getTotalCount, 
         getUsers, 
         getUsersPerPage } from '../../redux/selectors/users-selectors';
import { getIsAuthorized } from '../../redux/selectors/auth-selectors';

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);

        this.switchPage = this.switchPage.bind(this);
    }

    componentDidMount() {
        const {usersPerPage} = this.props;
        this.props.requestUsers(usersPerPage, 1);
    }

    switchPage(page) {
        const {usersPerPage} = this.props;
        this.props.requestUsers(usersPerPage, page);
    }

    render() {
        if (this.props.isFetching) return <Preloader />
        else {
            return (
                <Users totalCount={this.props.totalCount}
                    usersPerPage={this.props.usersPerPage}
                    page={this.props.page}
                    switchPage={this.switchPage}
                    users={this.props.users}
                    toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                    followingInProgress={this.props.followingInProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    isAuthorized={this.props.isAuthorized} />
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        users: getUsers(state),
        usersPerPage: getUsersPerPage(state),
        page: getPage(state),
        isFetching: getIsFetching(state),
        totalCount: getTotalCount(state),
        followingInProgress: getFollowingInProgress(state),
        isAuthorized: getIsAuthorized(state),
    }

};

export default compose(
    connect(mapStateToProps, { follow, unfollow, requestUsers, })
)(UsersContainer); //redux сам создает коллбэки чтобы задиспатчить (compose объединяет все процессоры/обработчики компоненты)