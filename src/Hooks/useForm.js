import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setValues(state => ({ ...state, [name]:value}));
    }

    const onSubmit = (e) => {
        e.preventDefault();
    
        onSubmitHandler(values);
   
        setValues(initialValues);
    }

    const changeValues = (newValues) => {
        setValues(newValues);
    }

    return [
        values,
        changeHandler,
        onSubmit,
        changeValues
    ]
}