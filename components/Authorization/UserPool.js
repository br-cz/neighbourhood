import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ca-central-1_1FOrY9koy',
  ClientId: '5nplgamcc1v7cnuqnh2o6c4ihu', //app client information, suffix _client and not _clientWeb
};

export default new CognitoUserPool(poolData);
