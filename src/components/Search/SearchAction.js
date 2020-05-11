const setSearch = search => ({ type: 'SEARCH', payload: search });

const searchAction = input => (dispatch) => {
  dispatch(setSearch(input));
};

export {searchAction};