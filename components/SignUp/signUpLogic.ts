import { notifications } from '@mantine/notifications';
import { signUp } from '@aws-amplify/auth';
import { createUserAPI, createUserCommunityAPI } from '@/src/api/services/user';

export const processSignUp = async (parameters: any, nextStep: () => void, handlers: any) => {
  const values = { ...parameters };
  values.email = parameters.email.toLowerCase().trim();
  values.password = parameters.password.trim();
  values.address = parameters.address.trim();
  values.preferredUsername = parameters.preferredUsername.toLowerCase().trim();
  values.firstName = parameters.firstName
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c: string) => c.toUpperCase());
  values.familyName = parameters.familyName
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c: string) => c.toUpperCase());
  values.phoneNumber = parameters.phoneNumber.trim();
  values.profilePic = parameters.profilePic;
  values.pronouns = parameters.pronouns;
  values.profilePic = parameters.profilePic;
  values.birthday = parameters.birthday;
  values.age = parameters.age;
  values.pets = parameters.pets;
  values.kids = parameters.kids;

  try {
    // Step 1: Sign Up with AWS Cognito
    const cognitoResponse = await signUp({
      username: values.email,
      password: values.password,
      options: {
        userAttributes: {
          email: values.email,
          name: values.firstName,
          family_name: values.familyName,
          preferred_username: values.preferredUsername,
          address: values.address,
        },
      },
    });

    // Step 2: Create user entry in your database
    if (cognitoResponse.userId) {
      const createUserInput = {
        id: cognitoResponse.userId,
        username: values.preferredUsername,
        email: values.email,
        firstName: values.firstName,
        lastName: values.familyName,
        selectedCommunity: values.selectedCommunity,
        postalCode: '',
        // address: values.address,
        // age: values.age,
        // phoneNumber: values.phoneNumber,
        // profilePic: values.profilePic,

      };

      await createUserAPI(createUserInput);

      await createUserCommunityAPI(cognitoResponse.userId, values.selectedCommunity);
    }

    console.log('Sign up success:', cognitoResponse.userId);
    nextStep();
  } catch (error) {
    console.log('error signing up:', error);
    notifications.show({
      title: 'Oops!',
      message: 'Something went wrong. Please contact an administrator.',
      color: 'red',
    });
  }
  handlers.close();
};
