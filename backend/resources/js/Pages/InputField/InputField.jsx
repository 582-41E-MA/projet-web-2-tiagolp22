import React from 'react';

const InputField = ({ label, name, value, onChange, error, type = 'text', options = [], getLabel }) => {
    const inputProps = {
        id: name,
        name: name,
        value: value,
        onChange: onChange
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {type === 'text' && (
                <input
                    type="text"
                    {...inputProps}
                />
            )}
            {type === 'select' && (
                <select {...inputProps}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {getLabel ? getLabel(option) : option.label}
                        </option>
                    ))}
                </select>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default InputField;
