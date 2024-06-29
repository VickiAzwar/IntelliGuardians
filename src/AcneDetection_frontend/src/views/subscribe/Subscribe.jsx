import React, { useEffect, useState } from "react";
import getDataSubscribed from "../../helpers/getDataSubscribed";
import Title from "../../component/Title/Title";
import Button from "../../component/Button/Button";
import { Modal, message } from 'antd';
import initAuthClient from '../../actorBackend/initAuthClient';
import getDataUser from '../../helpers/getDataUser';
import { Principal } from '@dfinity/principal';
import {
  CheckCircleOutlined,
} from "@ant-design/icons";
import Loaded from "../../component/Loaded/Loaded"; // Import Loaded component
import './Subscribe.css';


const Subscribe = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actor, setActor] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

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

    const fetchData = async () => {
      await fetchSubscriptions();
      await initAuth();
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  const showModal = (sub) => {
    setSelectedSubscription(sub);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSubscription(null);
    setLoading(false);
  };

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
          handleCancel();
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
      {loading && <Loaded />}
      <Title text="Subscribe" />
      <div className="subscription-box">
        <div className="subscription-message">
          "Try our services with an annual, monthly, or daily subscription and
          see what makes our website unique - choose a package now!"
        </div>
        {subscriptions.length > 0 ? (
          <div className="subscription-items">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="subscription-card"
              >
                <h1 className="subscription-title">
                  {sub.name}
                </h1>
                <hr className="border-1 border-gray-500 " />
                <p className="subscription-description">{sub.description}</p>
                <div className="subscription-price-box">
                  <p className="subscription-price">Price: {sub.price} coin</p>

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
            <div className="text-center place-contens-center">
              <h2 className="text-xl font-semibold border-b p-2">{selectedSubscription.name} Package</h2>
              <div className=" border-2 border-sky-800 text-center bg-sky-600 rounded-full text-xl text-white font-bold p-3 w-40 w-max-full mx-auto mt-4">
                Price <br />{selectedSubscription.price} Coin
              </div>
              <ul className="items-center p-3 text-base m-5">
                <li><CheckCircleOutlined /> Get {selectedSubscription.name} Access Detection</li>
                <li><CheckCircleOutlined /> Skin and Facial Care Tips</li>
              </ul>
              <p className="font-medium p-2 text-slate-500">Are you sure to confirm buy this package?</p>
             
              <div className="flex justify-center mt-3 gap-3">
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
              </div>
            </div>

          </>
        )}
      </Modal>
      <cardSubscribe />
    </>
  );
};

export default Subscribe;