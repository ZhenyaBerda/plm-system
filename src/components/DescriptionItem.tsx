import React from "react";

import "./styles/Drawer.css";

interface Props {
    title: string,
    content: string
}

const DescriptionItem = ({ title, content }: Props) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

export default DescriptionItem;