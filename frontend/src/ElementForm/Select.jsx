import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from '@hookform/error-message'

function Select(props) {
    const { form, name, type, placeholder, onchange, hidden, accept, options, defaultValue } = props
    const { register, formState: { errors } } = form
    const { onChange } = register(name)
    return (
        <>
            <select {...register(name)}
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
                defaultValue={defaultValue && defaultValue}
            >
                <option selected disabled value="">
                    Select {name}
                </option>
                {
                    options.map(option => (
                        <option key={option.name} value={option.name}>
                            {option.name}
                        </option>
                    ))
                }
            </select>
            <ErrorMessage errors={errors} name={name} render={({ message }) => <span className="text-base text-red-500">{message}</span>} />
        </>
    )
}

Select.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    accept: PropTypes.string
}

export default Select
