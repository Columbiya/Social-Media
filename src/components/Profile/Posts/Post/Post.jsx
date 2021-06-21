import classes from './Post.module.css';
import smile from '../../../../assets/images/smile.jpg';

const Post = (props) => {

    return (
        <div className={classes.item}>
            <img className={classes.image} src={props.profile?.photos.large || smile} alt="my avatar"/>
            <div className={classes.text}>
                <p>{ props.message }</p>
                <p className={classes.likes}>Likes: {props.likes}</p>
            </div>
        </div>
    );
};

export default Post;