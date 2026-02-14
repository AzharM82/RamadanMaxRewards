import { CosmosClient, Container } from "@azure/cosmos";

let profilesContainer: Container | null = null;
let progressContainer: Container | null = null;

function getClient(): CosmosClient {
  const connectionString = process.env.COSMOS_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("COSMOS_CONNECTION_STRING is not configured");
  }
  return new CosmosClient(connectionString);
}

export function getProfilesContainer(): Container {
  if (!profilesContainer) {
    const client = getClient();
    profilesContainer = client.database("RamadanApp").container("profiles");
  }
  return profilesContainer;
}

export function getProgressContainer(): Container {
  if (!progressContainer) {
    const client = getClient();
    progressContainer = client.database("RamadanApp").container("progress");
  }
  return progressContainer;
}
