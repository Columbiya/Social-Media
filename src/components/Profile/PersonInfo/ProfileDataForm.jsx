import classes from '../Profile.module.css';
import React from 'react';
import { Form } from 'react-final-form';
import { Button, createField } from '../../сommon/FormControls/FormControls';
import cn from 'classnames';

const ProfileDataForm = ({ initialValues, profile, updateProfile, setEditMode }) => {
    const onSubmit = async formData => {
        const response = await updateProfile(formData);

        if (response) return response;

        setEditMode(false);
    };  
    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {
                ({ handleSubmit, submitError, submitting }) => (
                    <form onSubmit={handleSubmit}>
                        <p><b className={classes.description}>Full name: </b></p>{ createField('full name..', null, 'fullName', 'input', []) }
                        <p><b className={classes.description}>About me: </b></p>{ createField('About me..', null, 'aboutMe', 'textarea', []) }
                        <p><b className={classes.description}>Looking for a job: </b></p>{ createField(null, null, 'lookingForAJob', 'input', [], {type: 'checkbox'}) }
                        <p><b className={classes.description}>My professional skills: </b></p>{ createField('description..', null, 'lookingForAJobDescription', 'textarea', []) }
                        <div>
                            <h3 className={classes.description}>Contacts: </h3>
                            {Object.keys(profile.contacts).map(key => (
                                <div key={key} className={classes.contact}>
                                    <p><b className={classes.description}>{key}: </b></p> {createField(key, null, 'contacts.' + key, 'input', [])}
                                </div>
                            ))} 
                        </div>
                        <Button className={cn({
                            [classes.disabled]: submitting
                        })} disabled={submitting} text={submitting ? 'Ожидайте...': 'Save edited information'} />
                        {submitError && <p className={classes.error}>{submitError}</p>}
                    </form>
                )
            }
        </Form>
    );
};

export default ProfileDataForm;