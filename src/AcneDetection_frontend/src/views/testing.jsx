import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../actorBackend/createActor";

function Testing() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const arrayBuffer = reader.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            const response = await backend.upload_file(uint8Array, file.name, identity.getPrincipal().toString());
            console.log(response);
        };
        reader.readAsArrayBuffer(file);
    }


    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button className="bg-sky-600 text-white p-2" onClick={handleUpload}>Upload</button>
        </div>
    );

};

export default Testing;