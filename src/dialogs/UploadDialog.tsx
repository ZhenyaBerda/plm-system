import React, {useEffect, useState} from 'react';
import {Modal, Upload} from "antd";
import { InboxOutlined } from '@ant-design/icons';

interface Props {
    isVisible: boolean,
    onClose: () => void,
    onUpload: (fileName: string, file: any) => void,
    isLoading: boolean,
}

function UploadDialog({isVisible, onClose, onUpload, isLoading}: Props) {
    const [file, setFile] = useState<any | null>(null);
    const [fileName, setFileName] = useState('file');

    useEffect(() => {
        if (!isVisible)
            setFile(null);

    }, [isVisible])

    return (
        <Modal
            title={"Загрузить файл"}
            visible={isVisible}
            onCancel={onClose}
            onOk={() => onUpload(fileName, file)}
            confirmLoading={isLoading}
        >
            <Upload.Dragger
                disabled={isLoading}
                beforeUpload={(file) => {
                    setFileName(file.name);
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                   reader.onload = function() {
                       setFile(reader.result);
                   }
                return false;
            }}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Нажмите или перетащите файлы в эту зону</p>
                <p className="ant-upload-hint">
                    Можно добавить несколько файлов
                </p>

            </Upload.Dragger>
        </Modal>
    );
}

export default UploadDialog;