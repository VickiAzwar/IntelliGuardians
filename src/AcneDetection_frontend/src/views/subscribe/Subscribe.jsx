import React, { useEffect, useState } from 'react';
import getDataSubscribed from '../../helpers/getDataSubscribed';
import Title from "../../component/Title/Title";
import Button from "../../component/Button/Button";
import { Modal, message } from 'antd';
import initAuthClient from '../../actorBackend/initAuthClient';
import getDataUser from '../../helpers/getDataUser';
import { Principal } from '@dfinity/principal';

const Subscribe = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [actor, setActor] = useState(null);
    const [dataUser, setDataUser] = useState(null);


    useEffect(() => {
        const fetchSubscriptions = async () => {
            const data = await getDataSubscribed();
            setSubscriptions(data);
        };

        const initAuth = async () => {
            const { authClient, actor } = await initAuthClient();
            setActor(actor);

            const user = await getDataUser();
            setDataUser(user);

        };

        fetchSubscriptions();
        initAuth();
    }, []);

    const showModal = (sub) => {
        setSelectedSubscription(sub);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedSubscription(null);
    };



    const handleConfirmSubscription = async () => {
        if (selectedSubscription && actor && dataUser) {
            try {
                const order = await actor.insert_order(Principal.fromText(dataUser.id), Principal.fromText(selectedSubscription.id));
                if (order) {
                    message.success('Subscription successful!');
                    setDataUser(prevUser => ({ ...prevUser, status: '1' }));
                } else {
                    message.error('Failed to subscribe.');
                }
            } catch (error) {
                message.error('Failed to subscribe.');
                console.error("Subscription error: ", error);
            }
        }
    };

    return (
        <>
            <Title text="Subscribe" />
            <div className="container mx-auto p-4">
                {subscriptions.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {subscriptions.map(sub => (
                            <div key={sub.id} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2">{sub.name}</h3>
                                <p className="text-gray-700 mb-2">Price: ${sub.price}</p>

                                <p className="text-gray-700 mb-2">{sub.description}</p>
                                <Button
                                    key={sub.id}
                                    primary={dataUser?.status !== '1'}
                                    disabled={dataUser?.status === '1'}
                                    className={"rounded-full"}
                                    onClick={() => showModal(sub)}
                                >
                                    Pilih Paket

                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No subscription packages available.</p>
                )}
            </div >
            <Modal
                title="Confirm Subscription"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedSubscription && (
                    <>
                        <p>Are you sure you want to select the {selectedSubscription.name} package?</p>
                        <Button primary className={"rounded-full"} onClick={handleConfirmSubscription}>
                            Confirm
                        </Button>
                        <Button secondary className={"rounded-full"} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                )}
            </Modal>
        </>
    );
};

export default Subscribe;