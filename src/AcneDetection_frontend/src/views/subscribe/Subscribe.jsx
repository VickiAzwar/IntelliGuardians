import React, { useEffect, useState } from "react";
import getDataSubscribed from "../../helpers/getDataSubscribed";
import Title from "../../component/Title/Title";
import Button from "../../component/Button/Button";
import { Modal, message } from 'antd';
import initAuthClient from '../../actorBackend/initAuthClient';
import getDataUser from '../../helpers/getDataUser';
import { Principal } from '@dfinity/principal';
import cardSubscribe from './partials/cardSubscribe';

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

  const items = [
    {
      id: 1,
      period: "1 Day",
      description:
        "Join us for a year of exclusive content and benefits by subscribing annually to our website!",
      price: 10,
    },
    {
      id: 2,
      period: "1 Month",
      description:
        "Get the best of our content every month - subscribe now for a monthly plan!",
      price: 100,
    },
    {
      id: 3,
      period: "1 Year",
      description:
        "Experience the best of our content for a day with our daily subscription - perfect for short-term access!",
      price: 200,
    },
  ];

  const handleConfirmSubscription = async () => {
    if (selectedSubscription && actor && dataUser) {
      try {
        const order = await actor.insert_order(
          Principal.fromText(dataUser.id),
          Principal.fromText(selectedSubscription.id)
        );
        if (order) {
          message.success("Subscription successful!");
          setDataUser((prevUser) => ({ ...prevUser, status: "1" }));
        } else {
          message.error("Failed to subscribe.");
        }
      } catch (error) {
        message.error("Failed to subscribe.");
        console.error("Subscription error: ", error);
      }
    }
  };

  return (
    <>
      <Title text="Subscribe" />
      <div className="flex flex-col justify-center text-center mx-auto mt-3 p-5 bg-sky-100 rounded-lg">
        <div className="items-center text-xl font-semibold mt-5 p-5 text-sky-800">
          "Try our services with an annual, monthly, or daily subscription and
          see what makes our website unique - choose a package now!"
        </div>
        {subscriptions.length === 0 ? (
          <div className="flex justify-center gap-5 mt-5">
            {items.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-5 rounded-lg shadow-md max-w-full w-80"
              >
                <h1 className="text-2xl font-bold pb-3 text-sky-800">
                  {sub.period}
                </h1>
                <hr className="border-1 border-gray-500 " />
                <p className="m-5 text-xl text-sky-900">{sub.description}</p>
                <div className="flex flex-col items-center border-2 border-sky-800  rounded-lg p-4">
                  <p className="text-sky-800 mb-2 text-2xl font-bold mb-3">Price: {sub.price} coin</p>

                  <Button
                    key={sub.id}
                    secondary={dataUser?.status !== "1"}
                    disabled={dataUser?.status === "1"}
                    className={"rounded-full"}
                    onClick={() => showModal(sub)}
                  >
                    Buy Package
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No subscription packages available.</p>
        )}
      </div>
      <Modal
        title="Confirm Subscription"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedSubscription && (
          <>
            <p>
              Are you sure you want to select the {selectedSubscription.name}{" "}
              package?
            </p>
            <Button
              primary
              className={"rounded-full"}
              onClick={handleConfirmSubscription}
            >
              Confirm
            </Button>
            <Button secondary className={"rounded-full"} onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </Modal>
      <cardSubscribe />
    </>
  );
};

export default Subscribe;
