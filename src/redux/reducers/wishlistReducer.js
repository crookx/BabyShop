const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
}