import React, { useState, useEffect } from 'react';
import Title from "../../component/Title/Title";
import { Input, Typography, Upload, Button, message, Modal } from "antd";
import ImgCrop from 'antd-img-crop';
import getDataUser from "../../helpers/getDataUser";
import initAuthClient from '../../actorBackend/initAuthClient';

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
            if (data) {
                setUserData(data);
                if (data.profile_image) {
                    setFileList([{
                        uid: '-1',
                        name: 'profile_image.png',
                        status: 'done',
                        url: `data:image/png;base64,${data.profile_image}`
                    }]);
                }
            }
        };

        const initAuth = async () => {
            const { authClient, actor } = await initAuthClient();
            setActor(actor);
        };

        fetchUserData();
        initAuth();
    }, []);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(newFileList[0].originFileObj);
            reader.onload = () => {
                setNewProfileImage(reader.result.split(',')[1]);
                setFileList([{
                    uid: '-1',
                    name: newFileList[0].name,
                    status: 'done',
                    url: reader.result
                }]);
            };
        } else {
            setNewProfileImage(null);
        }
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        setPreviewImage(src);
        setPreviewVisible(true);
    };

    const handleUpdateProfile = async () => {
        if (!actor) {
            message.error("Failed to initialize authentication.");
            return;
        }

        try {
            const updatedUser = {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                profile_image: newProfileImage ? Array.from(atob(newProfileImage), c => c.charCodeAt(0)) : null
            };

            const result = await actor.update_profile(userData.id, updatedUser.username, updatedUser.email, updatedUser.profile_image);
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

    return (
        <>
            <Title text="User Profile" />
            <div className="flex flex-col justify-center items-center">
                <div>
                    <ImgCrop rotationSlider>
                        <Upload
                            name="avatar"
                            className="avatar-uploader"
                            listType="picture-circle"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            showUploadList={true}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </div>
                <div className="p-2">
                    <Typography.Title level={5}>Username</Typography.Title>
                    <Input
                        maxLength={30}
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    />
                </div>
                <div className="p-2">
                    <Typography.Title level={5}>Email</Typography.Title>
                    <Input
                        maxLength={30}
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                </div>
                <Button type="primary" onClick={handleUpdateProfile}>
                    Update Profile
                </Button>
                <Modal
                    open={previewVisible}
                    title="Image Preview"
                    footer={null}
                    onCancel={() => setPreviewVisible(false)}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        </>
    );
}

export default Profile;
