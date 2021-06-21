export const requiredField = value => value ? undefined : 'Required';
export const maxLengthCreator = maxLength => value => (value && value.length < maxLength ? undefined : `Max length is ${maxLength}`);

export const composeValidators = (...validators) => value => {
    return validators.reduce((error, validator) => error || validator(value), undefined);
}