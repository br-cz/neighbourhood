import { object, string, ref, array } from 'yup';

export const selectedCommunityModalSchema = object({
  selectedCommunity: array()
    .of(string())
    .min(1, 'You must select at least one community')
    .max(1, 'You can only select one community at a time'),
});
