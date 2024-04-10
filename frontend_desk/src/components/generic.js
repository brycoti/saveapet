const API_URL = 'http://localhost:3000/api';

const postApi = async (credentials, link) => {
    const options = {
        method: 'POST',
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

const createUser = async (credentials) => {
    const registerLink = '/register'

    const data = await postApi(credentials, registerLink)
    if (!data.error) return true
    return false;
}

const login = async (credentials) => {
    const loginLink = '/login'

    return (postApi(credentials, loginLink));
}

export { login, createUser }