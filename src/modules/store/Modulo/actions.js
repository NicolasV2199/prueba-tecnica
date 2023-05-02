

export const logUserIn = ({commit}, token) => {

  commit('login', token)

}

export const logUserOut = ({commit}) => {

  commit('logout')

}

export const verifyStore = ({commit}) => {

  commit('initStore')

}

export const createUser = ({commit}, user) => {

  commit('setUser', user)

}