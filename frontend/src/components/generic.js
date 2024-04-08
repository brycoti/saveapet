const API_URL = 'http://localhost:3000/api';

const postApi = async (credentials, link) => {
    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }

    try {
        const response = await fetch(API_URL + link, options)
        const data = await response.json()
        return data

    } catch (e) {
        return e;
    }
}

const putApi = async (state, link) => {
    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ state })
    }

    try {
        const response = await fetch(API_URL + link, options)
        const data = await response.json()
        return data

    } catch (e) {
        return e;
    }
}

const putUser = async (state, id) => {
    const registerLink = '/register/user/' + id

    return (putApi(state, registerLink));

}

const createUser = async (credentials) => {
    const registerLink = '/register/user'

    const data = await postApi(credentials, registerLink)
    if (!data.error) return true
    return false;
}

const login = async (credentials) => {
    const loginLink = '/login/user'

    return (postApi(credentials, loginLink));
}

export { login, createUser, putUser }