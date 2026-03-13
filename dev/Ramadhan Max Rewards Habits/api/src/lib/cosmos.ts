import { TableClient, TableEntity, RestError } from "@azure/data-tables";

let profilesClient: TableClient | null = null;
let progressClient: TableClient | null = null;

function getConnectionString(): string {
  const connectionString = process.env.TABLE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("TABLE_STORAGE_CONNECTION_STRING is not configured");
  }
  return connectionString;
}

export function getProfilesClient(): TableClient {
  if (!profilesClient) {
    profilesClient = TableClient.fromConnectionString(getConnectionString(), "Profiles");
  }
  return profilesClient;
}

export function getProgressClient(): TableClient {
  if (!progressClient) {
    progressClient = TableClient.fromConnectionString(getConnectionString(), "Progress");
  }
  return progressClient;
}

// Helper: get entity by userId (partitionKey = "default", rowKey = userId)
export async function getEntity(client: TableClient, userId: string): Promise<Record<string, unknown> | null> {
  try {
    const entity = await client.getEntity("default", userId);
    return entity as unknown as Record<string, unknown>;
  } catch (err: any) {
    if (err instanceof RestError && err.statusCode === 404) {
      return null;
    }
    throw err;
  }
}

// Helper: upsert entity
export async function upsertEntity(client: TableClient, entity: TableEntity): Promise<void> {
  await client.upsertEntity(entity, "Replace");
}

// Helper: list all entities in a table
export async function listAllEntities(client: TableClient): Promise<Record<string, unknown>[]> {
  const entities: Record<string, unknown>[] = [];
  for await (const entity of client.listEntities()) {
    entities.push(entity as unknown as Record<string, unknown>);
  }
  return entities;
}
