// EditableProfileItem.jsx
import React from 'react';
import './EditableProfileItem.css'; 

const EditableProfileItem = ({ label, name, value, isEditing, handleChange }) => {
    return (
        <div className="profile-item">
            <label className="profile-label">{label}</label>
            {isEditing ? (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="profile-input"
                />
            ) : (
                <p className="profile-value">{value}</p>
            )}
        </div>
    );
};

export default EditableProfileItem;
