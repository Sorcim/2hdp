const setUser = user => ({ type: 'LOGIN', payload: user });
const unsetUser = user => ({ type: 'LOGOUT', payload: false });

const loginAction = user => (dispatch) => {
  dispatch(setUser(user));
};

const logoutAction = user => (dispatch) => {
  dispatch(unsetUser(user));
};

export {loginAction, logoutAction};