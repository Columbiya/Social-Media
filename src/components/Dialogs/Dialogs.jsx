import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React, { useEffect, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, createFormElement } from '../сommon/FormControls/FormControls';
import { composeValidators, maxLengthCreator, requiredField } from '../../utils/validators/validators';

const maxLength15 = maxLengthCreator(15);
const Textarea = createFormElement("textarea");

const Dialogs = props => {
    let messagesElements = props.messages.map(message => <Message message={message.message} fromMe={message.fromMe} key={message.id} profilePhoto={props.profilePhoto} />);
    let dialogsElements = props.dialogs.map(element => <DialogItem id={element.id} name={element.name} key={element.id} />);
    let messagesContainer = useRef(null)

    useEffect(() => {
        messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }, [messagesElements, messagesContainer]);

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div className={classes.sticky}>
                    <div className={classes.wrapper} ref={messagesContainer}>
                        {messagesElements}
                    </div>
                    <DialogsForm sendMessage={props.sendMessage} />
                </div>
            </div>
        </div>
    );
};

const DialogsForm = props => {
    const onSubmit = formData => {
        props.sendMessage(formData.newMessageText);
    };

    const onSubmitReset = (event, handleSubmit, form) => {
        handleSubmit(event);
        form.reset();
    }

    return (
        <Form onSubmit={onSubmit}>
            {props => (
                <form className={classes.typeMessage} onSubmit={event => onSubmitReset(event, props.handleSubmit, props.form)}>
                    <Field component={Textarea} name={'newMessageText'} className={'comment'} validate={composeValidators(requiredField, maxLength15)} placeholder="Type your message here.." />
                    <Button text={'Send'} />
                </form>
            )}
        </Form>
    );



};

export default Dialogs;