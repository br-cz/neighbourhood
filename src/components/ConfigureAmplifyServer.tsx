import { Amplify } from 'aws-amplify';
import config from '@/src/amplifyconfiguration.json';

export const configureAmplify = () => {
  Amplify.configure(config);
};
