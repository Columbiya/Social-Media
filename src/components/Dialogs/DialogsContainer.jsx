import Dialogs from './Dialogs';
import { sendMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRedirect from '../hoc/withAuthRedirect';
import { getDialogs, getMessages } from '../../redux/selectors/dialogs-selectors';
import { getAuthorizedUserProfilePhoto } from '../../redux/selectors/auth-selectors';

const mapStateToProps = state => {
    return {
        messages: getMessages(state),
        dialogs: getDialogs(state),
        profilePhoto: getAuthorizedUserProfilePhoto(state)
    }
};

export default compose(
    connect(mapStateToProps, { sendMessage }),
    withRedirect
)(Dialogs);