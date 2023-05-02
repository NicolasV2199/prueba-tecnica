
export const login = (state, token) =>{
  state.token = token;
  localStorage.setItem('token', token);
}

export const logout = (state) => {
  state.token = "";
  state.user = {};
  localStorage.removeItem('token');
}

export const initStore = (state) => {
  if(localStorage.getItem('token')){
    state.token = localStorage.getItem('token');
  }
}

export const setUser = (state, user) => {
  state.user = user;
}
