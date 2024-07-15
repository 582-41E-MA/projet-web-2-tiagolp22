import React from 'react';

const InputField = ({ label, name, value, onChange, error }) => {
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default InputField;
