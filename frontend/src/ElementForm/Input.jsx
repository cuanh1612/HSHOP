import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from '@hookform/error-message'

function Input(props) {
    const { form, name, type, placeholder, onchange, hidden, accept, number, defaultValue } = props
    const { register, formState: { errors } } = form
    const { onChange } = register(name)

    function CheckNumber(event) {
        var x = event.charCode || event.keyCode;
        if (x < 48 || x > 57) {  
            event.preventDefault()
        }
    }
      
    return (
        <>
            <input {...register(name)}
                onChange={(e) => {
                    onchange && onchange(e)
                    onChange(e)
                }}
                id={name}
                className={hidden
                    ? "hidden w-full px-2 py-2 mt-2 text-base border rounded-lg outline-none"
                    : "w-full px-2 py-2 mt-2 text-base border rounded-lg outline-none"
                }
                type={type}
                placeholder={placeholder}
                accept={accept && accept}
                onKeyPress={number && CheckNumber}
                defaultValue={defaultValue&&defaultValue}
            />
            <ErrorMessage errors={errors} name={name} render={({ message }) => <span className="text-base text-red-500">{message}</span>} />
        </>
    )
}

Input.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    accept: PropTypes.string
}

export default Input

