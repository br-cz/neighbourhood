import { object, string, ref, array } from 'yup';

export const selectedCommunityModalSchema = object({
  selectedCommunity: string().required('Selecting a community required.'),
});
