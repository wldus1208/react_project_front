import { ADD_TO_RECENTLY_VIEWED } from './types';

export const addToRecentlyViewed = (product) => ({
  type: ADD_TO_RECENTLY_VIEWED,
  payload: product,
});
