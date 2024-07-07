import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DetailItem.css";
const DetailItem = ({ icon, label, value }) => (
    <div className="detail-item">
        <FontAwesomeIcon icon={icon} />
        <p>
            <strong>{label} : </strong> {value}
        </p>
    </div>
);

export default DetailItem;
