import React, { useState, useEffect } from 'react';
import Title from "../../component/Title/Title";
import { Input, Typography, Upload, Button as Btn, message } from "antd";
import getDataUser from "../../helpers/getDataUser";
import initAuthClient from '../../actorBackend/initAuthClient';
import { UploadOutlined } from "@ant-design/icons";
import Button from '../../component/Button/Button';
import { Principal } from '@dfinity/principal';

const Profile = () => {
    const [fileList, setFileList] = useState([]);
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        email: '',
        profile_image: ''
    });
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [actor, setActor] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getDataUser();
            setUserData(data);
            if (data.profile_image) {
                setPreviewImage(`data:image/png;base64,${data.profile_image}`);
                setPreviewVisible(true);
            } else {
                setPreviewImage('https://cdn-icons-png.flaticon.com/512/149/149071.png'); // Dummy image URL
                setPreviewVisible(true);
            }
        };

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
        if (!actor) {
            message.error("Failed to initialize authentication.");
            return;
        }

        try {
            // const imgBlob = await fileToBlob(newProfileImage);
 
            const updatedUser = {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                // profile_image: imgBlob,
            };

            // const result = await actor.update_profile(updatedUser.id, updatedUser.username, updatedUser.email, updatedUser.profile_image);
            console.log("username: ", updatedUser.username)
            console.log("username: ", updatedUser.email)
            const result = await actor.update_username_and_email(updatedUser.id, updatedUser.username, updatedUser.email)
            if (result) {
                message.success("Profile updated successfully!");
                setUserData(updatedUser);
            } else {
                message.error("Failed to update profile.");
            }
        } catch (error) {
            message.error("Failed to update profile.");
            console.error("Update profile error: ", error);
        }
    };


    const fileToBlob = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(new Uint8Array(reader.result));
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
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
            console.log(file);
            setNewProfileImage(file);
            return false; // Prevent automatic upload
        },
        onChange: handleChange
    };

    return (
        <>
            <Title text="User Profile" />
            <div className='flex justify-center gap-10 shadow-xl rounded-lg border-2 max-w-full h-auto w-3/5 py-10 mx-auto'>
                <div className='img bg-sky-100 rounded-lg w-80 h-80 p-10 flex justify-center items-center'>
                    {previewVisible && (
                        <img src={previewImage} alt="Image Preview" className='rounded-full object-cover w-full h-full' />
                    )}
                </div>
                <div className='flex flex-col justify-center w-max-full p-5 border-2 border-black rounded-xl'>
                    <div className='mt-3'>
                        <Typography.Title level={5}>Username</Typography.Title>
                        <Input 
                            placeholder='Username'
                            value={userData.username} // Gunakan 'value' untuk mengikat input dengan state
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            style={{ maxWidth: '100%', width: '400px' }} 
                        />
                    </div>
                    <div className='mt-3'>
                        <Typography.Title level={5}>Email</Typography.Title>
                        <Input 
                            placeholder='Email'
                            value={userData.email} // Gunakan 'value' untuk mengikat input dengan state
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            style={{ maxWidth: '100%' }} 
                        />
                    </div>
                    <div className='mt-3'>
                        <Typography.Title level={5}>Profile Image</Typography.Title>
                        <Upload {...uploadProps} fileList={fileList}>
                            <Btn icon={<UploadOutlined />}>Click to Upload</Btn>
                        </Upload>
                    </div>
                    <div className='flex items-center pt-5'>
                        <Button primary className="rounded-full max-w-full w-60 pt-3 h-auto mx-auto" onClick={handleUpdateProfile}>
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
