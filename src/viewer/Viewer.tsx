import React, { useState } from 'react';
import Display from "./Display";
import Page from "../pages/Page";
import {Button, Input} from 'antd';

import "./Viewver.css";

const Viewer = () => {
    const [file, setFile] = useState("https://cad.onshape.com/documents/0cc05df50afa7069d40d5b29/w/4e9a02bde82a52420bb553ee/e/af1653a7fa67658e00c67315");
    const [showProgress, setShowProgress] = useState(true);

    const onViewerReady = () => {
        setShowProgress(false)
    }

    const onViewerLoaded = () => {
        setShowProgress(false)
    }

    const onViewerError = () => {
        setShowProgress(false)
    }
    return (
        <Page>
            <div className={"viewer-toolbar"}>
                <Button>Загрузить файл</Button>
                <div className={"viewer-link"}>
                    <p style={{ margin: 0, marginRight: 5}}>Ссылка на файл:</p>
                    <Input
                        style={{ width: 500}}
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                    />
                </div>
            </div>
            <Display
                file={file}
                onReady={onViewerReady}
                onLoaded={onViewerLoaded}
                onError={onViewerError}
            />
        </Page>
    );
}

export default Viewer;