import React, { useState } from 'react';
import './Tips.css';
import DataTips from './partials/DataTips';
import { Modal } from 'antd';
import Title from '../../component/Title/Title';

const Tips = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const showModal = (tip) => {
    setSelectedTip(tip);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Title text="Skin Care Tips and Tricks" />
      <div className="itemContain">
        <div className="cardContain">
          {DataTips.map((data) => (
            <div key={data.id} className="mainContain">
              <div
                className="content"
                style={{ textAlign: 'left' }}
                onClick={() => showModal(data)}
              >
                <img src={data.image} alt="image" />
                <h1>{data.title}</h1>
                <h2>Selengkapnya...</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTip && (
        <Modal
          title={selectedTip.title}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <img src={selectedTip.image} alt="image" style={{ width: '100%', marginBottom: '16px' }} />
          <div dangerouslySetInnerHTML={{ __html: selectedTip.content }} />
        </Modal>
      )}
    </>
  );
};

export default Tips;
