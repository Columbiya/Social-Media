import Post from '../Post/Post';
import classes from './MyPosts.module.css';
import React from 'react';
import { Form, Field } from 'react-final-form';
import { maxLengthCreator, requiredField, composeValidators } from '../../../../utils/validators/validators';
import { Button, createFormElement } from '../../../сommon/FormControls/FormControls';

const maxLength10 = maxLengthCreator(10);
const Textarea = createFormElement("textarea");

const MyPosts = ({posts, profile, isOwner, addPost}) => { 
    let postElements = [...posts].reverse().map(post => <Post profile={profile} message={post.message} likes={post.likes} key={post.id} />);

    if (!isOwner) {
        return null;
    }

    return (
        <div>
            <h2 className={classes.title}>Add a new post</h2>
            <MyPostsForm onSubmit={addPost} />
            {postElements};
        </div>
    );
};

const MyPostsForm = props => {
    const onSubmit = formData => {
        props.onSubmit(formData.postText);
    };

    const onSubmitReset = async (event, handleSubmit, form) => {
        handleSubmit(event);
        form.restart();
    };

    return (
        <Form onSubmit={onSubmit} >
            {( {handleSubmit, form} ) => (
                <form className={classes.form} onSubmit={event => onSubmitReset(event, handleSubmit, form)}>
                    <Field component={Textarea} name={'postText'} className={'comment'} validate={composeValidators(requiredField, maxLength10)} placeholder='your news.....' />
                    <Button text={'Apply'} />
                </form>
            )}
        </Form>
    );
};



export default MyPosts;