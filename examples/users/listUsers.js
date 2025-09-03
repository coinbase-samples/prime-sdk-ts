/**
 * Copyright 2025-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Example: List Entity Users
 *
 * This example demonstrates how to retrieve all users associated with a specific entity
 * using the Users service. This provides information about all users who have access
 * to the entity, including their roles and permissions.
 *
 * Usage:
 *   node examples/users/listUsers.js
 *
 * Environment Variables Required:
 *   - ENTITY_ID: The ID of the entity to list users for
 */

// #docs operationId: PrimeRESTAPI_GetEntityUsers
// #docs operationName: List Entity Users

const { CoinbasePrimeClientWithServices } = require('../../dist');

const client = CoinbasePrimeClientWithServices.fromEnv();
const entityId = process.env.ENTITY_ID;

if (!entityId) {
  console.error('Error: ENTITY_ID environment variable is required');
  return;
}

async function listUsersExample() {
  try {
    console.log(`👥 Listing entity users - Entity ID: ${entityId}`);

    const request = {
      entityId,
    };

    const usersResponse = await client.users.listUsers(request);

    console.dir(usersResponse, { depth: null });
  } catch (error) {
    console.error('❌ Error listing entity users:', error);
  }
}

listUsersExample();
