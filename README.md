# Perform action on aws dynamoDB by using aws lambda

This repository contains an AWS Lambda function that perform the action on AWS DynamoDB. 
This Lambda function can be triggered with an event containing the `action` and based on the action lambda will perform the operation.

## Prerequisites

- **AWS Account**: You need an AWS account to deploy and run the Lambda function.
- **IAM Permissions**: Ensure that your Lambda execution role has the appropriate permissions to access S3 (e.g., `s3:GetObject`).
- **AWS SDK**: The AWS SDK is already included in the Lambda runtime environment.
