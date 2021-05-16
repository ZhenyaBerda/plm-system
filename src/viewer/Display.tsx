import React, {useEffect, useState } from 'react';
import Unity, { UnityContent } from "react-unity-webgl";

const unityContent = new UnityContent(
    "Build/build.json",
    "Build/UnityLoader.js",
    {
        adjustOnWindowResize: true
    }
);

const Display = (props: any) => {
    const [ready, setReady] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    unityContent.on("Ready", () => {
            setReady(true)
            loadFile();

            if (typeof props.onReady == "function") props.onReady();
        }
    );

    unityContent.on("OnLoaded", () => {
            try {
                if (typeof props.onLoaded == "function") props.onLoaded();
            }
            catch{ }
        }
    );

    unityContent.on("OnError", () => {
            try {
                if (typeof props.onError == "function") props.onError();
            }
            catch{ }
        }
    );

    useEffect(() => {
        if (ready) loadFile()
    }, [props.file]);

    const loadFile = () => {
        try {
            if (props.file && typeof props.file == "object") {
                let reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e: any) {
                        // @ts-ignore
                        (window.filedata = window.filedata ? window.filedata : {})[file.name] = e.target.result;
                        unityContent.send("root", "FileUpload", file.name)
                        setFileName(file.name);
                    }
                })(props.file);
                reader.readAsArrayBuffer(props.file);
            }
            else if (typeof props.file == "string") {
                unityContent.send("root", "Load", JSON.stringify({ file: props.file }))
                setFileName(props.file);
            }
            else {
                unityContent.send("root", "Clear");
                setFileName("");
            }
        }
        catch (e) {
            console.log(e);
            if (typeof props.onError == "function") props.onError();
        }

    }
    return (
        <div>
            <Unity unityContent={unityContent} height="100%" width="100%" />
        </div>
    );
}

export default Display;