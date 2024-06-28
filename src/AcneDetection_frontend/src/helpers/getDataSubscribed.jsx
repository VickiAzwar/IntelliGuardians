import initAuthClient from '../actorBackend/initAuthClient';

const getDataSubscribed = async () => {
  const { authClient, actor } = await initAuthClient();
  try {
    const dataSubscribed = await actor.read_subscribe_packages();
    console.log(dataSubscribed);

    if (dataSubscribed && dataSubscribed.length > 0) {
      return dataSubscribed.map(data => ({
        id: data.id.toString(),
        name: data.name,
        price: parseInt(data.price, 10),
        period: data.period,
        description: data.description,
        created_at: data.created_at
      }));
    }
  } catch (error) {
    if (error && error.message.includes('Invalid certificate: Signature verification failed')) {
      console.error("Certificate verification failed. Fetching root key for local development.");
      const { agent } = await initAuthClient();
      await agent.fetchRootKey();
      return await getDataSubscribed(); // Retry fetching the data
    } else {
      console.error("Failed to initialize authentication:", error);
    }
  }
  return [];
};

export default getDataSubscribed;
