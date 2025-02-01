const { getItem, putItem, updateItem, deleteItem } = require('./utils');

// Lambda handler function
exports.handler = async (event) => {
  // You can log the event to debug
  console.log('Received event:', JSON.stringify(event, null, 2));

  const action = event.action; // This can be 'get', 'put', 'update', or 'delete'
  const tableName = 'YourTableName'; // Replace with your actual DynamoDB table name

  // Determine what action to take
  try {
    switch (action) {
      case 'get':
        return await handleGet(event, tableName);
      case 'put':
        return await handlePut(event, tableName);
      case 'update':
        return await handleUpdate(event, tableName);
      case 'delete':
        return await handleDelete(event, tableName);
      default:
        throw new Error('Unknown action');
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

// Handle Get Item Request
const handleGet = async (event, tableName) => {
  const params = {
    TableName: tableName,
    Key: event.key, // Pass the key (ID) in the event
  };

  const result = await getItem(params);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

// Handle Put Item Request
const handlePut = async (event, tableName) => {
  const params = {
    TableName: tableName,
    Item: event.item, // The item data will be passed in the event body
  };

  await putItem(params);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Item added successfully' }),
  };
};

// Handle Update Item Request
const handleUpdate = async (event, tableName) => {
  const params = {
    TableName: tableName,
    Key: event.key, // Pass the key (ID) in the event
    UpdateExpression: event.updateExpression, // e.g., "set name = :name, age = :age"
    ExpressionAttributeValues: event.expressionAttributeValues, // e.g., { ":name": "Jane", ":age": 35 }
    ReturnValues: 'UPDATED_NEW',
  };

  const result = await updateItem(params);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Item updated successfully', result }),
  };
};

// Handle Delete Item Request
const handleDelete = async (event, tableName) => {
  const params = {
    TableName: tableName,
    Key: event.key, // Pass the key (ID) in the event
  };

  await deleteItem(params);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Item deleted successfully' }),
  };
};
