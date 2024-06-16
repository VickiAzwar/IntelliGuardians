import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './idlFactory.jsx';
import { AuthClient } from '@dfinity/auth-client';

const canisterId = process.env.CANISTER_ID_ACNEDETECTION_BACKEND; // Ganti dengan Canister ID Anda

const createActor = async () => {
  const authClient = await AuthClient.create();
  const identity = authClient.getIdentity();
  const agent = new HttpAgent({ identity });

  if (process.env.DFX_NETWORK !== 'production') {
    agent.fetchRootKey(); // Hanya untuk pengembangan lokal
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};

export { createActor };
