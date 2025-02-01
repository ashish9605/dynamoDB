const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Get item from DynamoDB
exports.getItem = async (params) => {
  try {
    const result = await dynamoDB.get(params).promise();
    return result.Item; // Return the retrieved item
  } catch (error) {
    throw new Error('Failed to get item: ' + error.message);
  }
};

// Put (Insert) an item into DynamoDB
exports.putItem = async (params) => {
  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    throw new Error('Failed to put item: ' + error.message);
  }
};

// Update an item in DynamoDB
exports.updateItem = async (params) => {
  try {
    const result = await dynamoDB.update(params).promise();
    return result.Attributes; // Return the updated attributes
  } catch (error) {
    throw new Error('Failed to update item: ' + error.message);
  }
};

// Delete an item from DynamoDB
exports.deleteItem = async (params) => {
  try {
    await dynamoDB.delete(params).promise();
  } catch (error) {
    throw new Error('Failed to delete item: ' + error.message);
  } 
};
