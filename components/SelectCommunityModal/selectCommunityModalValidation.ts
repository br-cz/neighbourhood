import { object, string, ref, array } from 'yup';

export const selectedCommunityModalSchema = object().shape({
  selectedCommunity: array()
    .of(string())
    .min(1, 'You must select at least one community')
    .required('Selecting a community is required.'),
});
