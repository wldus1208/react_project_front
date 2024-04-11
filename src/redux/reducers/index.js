const initialState = {
    recentlyViewed: [] 
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_RECENTLY_VIEWED':
        return {
          ...state,
          recentlyViewed: [...state.recentlyViewed, action.payload] 
        };

      default:
        return state;
    }
  };
  
  export default rootReducer;
  