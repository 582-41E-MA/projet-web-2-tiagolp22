import React from "react";
import "./EditableProfileItem.css";

const EditableProfileItem = ({
    label,
    name,
    value,
    isEditing,
    handleChange,
    type = "text",
    options = [],
    disabled = false,
}) => {
    const inputProps = {
        type: type,
        name: name,
        value: value,
        onChange: (e) => handleChange(name, e.target.value),
        className: "profile-input",
        disabled: disabled,
    };

    return (
        <div className="form-group">
            <label className="profile-label">{label}</label>
            {isEditing ? (
                type === "select" ? (
                    <select {...inputProps}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : type === "password" ? (
                    <input {...inputProps} />
                ) : (
                    <input {...inputProps} />
                )
            ) : (
                <div className="non-editable-field">
                    {type === "select" ? (
                        <select {...inputProps} disabled>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : type === "password" ? (
                        <p className="profile-value">{"•".repeat(value.length)}</p>
                    ) : (
                        <p className="profile-value">{value}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EditableProfileItem;
