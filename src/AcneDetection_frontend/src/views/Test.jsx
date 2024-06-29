import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './idlfactory';

const agent = new HttpAgent({ host: 'https://your-ic-host' });
const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: 'your-canister-id',
});

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadImage = async () => {
        if (!file) {
            alert('No file selected.');
            return;
        }

        const blob = new Blob([file], { type: file.type });
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        try {
            const updatedUser = await actor.update_profile(
                userId,
                username ? { 'username': username } : null,
                email ? { 'email': email } : null,
                { 'profile_image': uint8Array }
            );

            if (updatedUser) {
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image.');
        }
    };

    return (
        <div>
            <h1>Upload Profile Image</h1>
            <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadImage}>Upload Image</button>
        </div>
    );
}

export default ImageUpload;
