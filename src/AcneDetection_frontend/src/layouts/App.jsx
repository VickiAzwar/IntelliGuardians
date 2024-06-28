import React, { useState, useEffect } from 'react';
import { AssetManager } from '@dfinity/assets';
import { HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';

const App = () => {
  const [agent, setAgent] = useState(null);
  const [assetManager, setAssetManager] = useState(null);

  const canisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;

  useEffect(() => {
    const init = async () => {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const newAgent = new HttpAgent({ identity });

      if (process.env.DFX_NETWORK !== 'production') {
        await newAgent.fetchRootKey(); // Only for local development
      }

      const newAssetManager = new AssetManager({
        canisterId: canisterId,
        agent: newAgent,
      });

      setAgent(newAgent);
      setAssetManager(newAssetManager);
    };

    init();
  }, []);

  const uploadAsset = async (file) => {
    if (!assetManager) {
      console.error('Asset manager is not initialized');
      return;
    }

    const key = await assetManager.store(file)

    try {
        await assetManager.store(file)
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadAsset(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default App;
