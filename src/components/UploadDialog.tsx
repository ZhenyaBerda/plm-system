import React from 'react';
import {Modal} from "antd";

interface Props {
    isVisible: boolean,
    onClose: () => void,
    groupId: string,
    onUpload: (file: File) => void,
}

function UploadDialog() {
    return (
        <Modal

        >

        </Modal>
    );
}

export default UploadDialog;