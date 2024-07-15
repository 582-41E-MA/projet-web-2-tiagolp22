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
        <div className="profile-item">
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
                ) : (
                    <input {...inputProps} />
                )
            ) : (
                <p className="profile-value">{value}</p>
            )}
        </div>
    );
};

export default EditableProfileItem;
