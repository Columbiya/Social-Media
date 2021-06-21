import { connect } from 'react-redux';
import { addPost } from '../../../../redux/profile-reducer';
import { getMyPosts, getUserProfile } from '../../../../redux/selectors/profile-selectors';
import MyPosts from './MyPosts';


const mapStateToProps = state => {
    return {
        posts: getMyPosts(state),
        profile: getUserProfile(state)
    };
};

export default connect(mapStateToProps, { addPost })(MyPosts);