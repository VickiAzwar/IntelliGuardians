import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './idlFactory.jsx';
import { AuthClient } from '@dfinity/auth-client';

const canisterId = process.env.CANISTER_ID_ACNEDETECTION_BACKEND; // Ganti dengan Canister ID Anda

const createActor = async (identity) => {
  
  const agent = new HttpAgent({ identity });

  if (process.env.DFX_NETWORK !== 'production') {
    await agent.fetchRootKey(); // Hanya untuk pengembangan lokal
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};

export { createActor };
