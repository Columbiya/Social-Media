import classes from './FormControls.module.css';
import { Field } from 'react-final-form'
import { composeValidators } from '../../../utils/validators/validators';
import cn from 'classnames';

export const createFormElement = Element => ({ input, meta: { touched, error }, className, ...props }) => {
    const errorForm = touched && error ? classes.errorForm : null;
    return (
        <div className={classes.container}>
            <Element className={cn(classes[className], errorForm)} {...input} {...props} />
            {touched && error && <span className={classes.errorText}>{error}</span>}
        </div>
    );
};

export const createField = (placeholder, text, name, component, validators, props = {}) => {
    return (
        <>
            <Field placeholder={placeholder} name={name} component={component} validate={composeValidators(...validators)} type={props.type} {...props} />
            {text}
        </>
    );
};

export const Button = ({ text, className, ...props }) => {
    return <button className={cn(classes.button, {[className]: className})} type="submit" {...props}>{text}</button>
};