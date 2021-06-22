import React from 'react';
import { Form } from 'react-final-form'
import { connect } from 'react-redux';
import { maxLengthCreator, requiredField } from '../../utils/validators/validators';
import { Button, createField, createFormElement } from '../сommon/FormControls/FormControls';
import { login } from '../../redux/auth-reducer';
import classes from './Login.module.css';
import { Redirect } from 'react-router';
import { getCaptcha, getIsAuthorized } from '../../redux/selectors/auth-selectors';
import cn from 'classnames';

const maxLength30 = maxLengthCreator(30);
const Input = createFormElement("input");

const Login = ({ isAuthorized, login, captchaUrl }) => {
    if (isAuthorized) return <Redirect to={'/profile'} />

    return <>
        <section className={classes.loginContainer}>
            <LoginForm login={login} captchaUrl={captchaUrl} />
        </section>
    </>
};

const LoginForm = ({ login, captchaUrl }) => {
    const onSubmit = async formData => {
        let { email, password, rememberMe, captcha } = formData;

        return await login(email, password, rememberMe, captcha);
    }

    return (
        <Form onSubmit={onSubmit}>
            {({ submitError, submitting, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                    <h1 className={classes.loginTitle}>Авторизация</h1>
                    {createField('put your login here..', null, 'email', Input, [requiredField, maxLength30], { type: 'text' })}
                    {createField('put your password here..', null, 'password', Input, [requiredField, maxLength30], { type: 'password' })}
                    {createField(null, 'Remember me', 'rememberMe', Input, [], { type: 'checkbox' })}
                    {captchaUrl &&
                        <>
                            <img src={captchaUrl} alt="captcha" />
                            {createField('symbols', null, 'captcha', Input, [requiredField], classes.form_element)}
                        </>}
                    {submitError && <p className={classes.error}>{submitError}</p>}
                    <Button type={'submit'} className={cn({[classes.disabled]: submitting})} text={'Авторизироваться'} disabled={submitting} />
                </form>
            )}
        </Form>
    );
};

const mapStateToProps = state => ({
    isAuthorized: getIsAuthorized(state),
    captchaUrl: getCaptcha(state)
});

export default connect(mapStateToProps, { login })(Login);