import React, { useState, useEffect } from 'react';
import Title from "../../component/Title/Title";
import { Input, Typography, Upload, Button as Btn, message } from "antd";
import getDataUser from "../../helpers/getDataUser";
import initAuthClient from '../../actorBackend/initAuthClient';
import { UploadOutlined } from "@ant-design/icons";
import Button from '../../component/Button/Button';
import './Profile.css';
import { Principal } from '@dfinity/principal';

const Profile = () => {
    const [fileList, setFileList] = useState([]);
    const [userData, setUserData] = useState(null);  // Default to null
    const [file, setFile] = useState(null);
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [actor, setActor] = useState(null);

    const fetchUserData = async () => {
        const data = await getDataUser();
        if (data) {
            setUserData(data);
            if (data.profile_image) {
                setPreviewImage(data.profile_image);
                setPreviewVisible(true);
            } else {
                setPreviewImage('https://cdn-icons-png.flaticon.com/512/149/149071.png'); // Dummy image URL
                setPreviewVisible(true);
            }
        } else {
            setUserData({
                id: '',
                username: '',
                email: '',
                profile_image: ''
            });
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const { authClient, actor } = await initAuthClient();
            setActor(actor);
        };

        fetchUserData();
        initAuth();
    }, []);


    const handleChange = ({ file }) => {
        if (file.originFileObj) {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => {
                setNewProfileImage(reader.result.split(',')[1]);
                setPreviewImage(reader.result);
                setPreviewVisible(true);
            };
            setFileList([file]);
        } else {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
            setPreviewVisible(true);
        }
    };

    const handleUpdateProfile = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {

                const username = userData.username;
                const email = userData.email;


                const arrayBuffer = e.target.result
                const bytes = new Uint8Array(arrayBuffer);

                const principal = Principal.fromText(userData.id);

                // Assuming update_profile_image accepts a byte array
                const response = await actor.update_profile_image(principal, bytes, username, email);
                if (response) {
                    message.success('Image uploaded successfully!')
                     await fetchUserData();
                }

            } catch (error) {
                message.error('Failed to upload image.', error);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        beforeUpload: (file) => {
            const isImage = file.type === 'image/png' || file.type === 'image/jpeg';
            if (!isImage) {
                message.error('You can only upload PNG or JPG files!');
                return Upload.LIST_IGNORE;
            }

            setNewProfileImage(file);
            setFile(file);

            return false; // Prevent automatic upload
        },
        onChange: handleChange
    };

    return (
        <div className='profile-container'>
            <div className='profile-image-container'>
                {previewVisible && (
                    <img src={previewImage} alt="Image Preview" className='profile-image-preview' />
                )}
            </div>
            {userData && (
                <div className='profile-details'>
                    <div className='profile-field'>
                        <Typography.Title level={5} className='profile-field-title'>Username</Typography.Title>
                        <Input
                            placeholder='Username'
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            className='profile-input'
                        />
                    </div>
                    <div className='profile-field'>
                        <Typography.Title level={5} className='profile-field-title'>Email</Typography.Title>
                        <Input
                            placeholder='Email'
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className='profile-input'
                        />
                    </div>
                    <div className='upload-button'>
                        <Typography.Title level={5} className='profile-field-title'>Profile Image</Typography.Title>
                        <Upload {...uploadProps} fileList={fileList}>
                            <Btn icon={<UploadOutlined />}>Click to Upload</Btn>
                        </Upload>
                    </div>
                    <div className='edit-profile-button'>
                        <Button primary className="rounded-full max-w-full w-60 pt-3 h-auto mx-auto" onClick={handleUpdateProfile}>
                            Edit Profile
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
