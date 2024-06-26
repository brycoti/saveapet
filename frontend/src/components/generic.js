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

const putApi = async (state, link) => {
    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    }

    try {
        const response = await fetch(API_URL + link, options)
        const data = await response.json()
        return data

    } catch (e) {
        return e;
    }
}

const getApi = async (link) => {

    const options = {
        credentials: "include",
    };
    try {
        const response = await fetch(API_URL + link, options)
        const data = await response.json()
        return data
    } catch (e) {
        return e;
    }

}

const createReaction = async (information) => {
    const reactionLink = '/user/petmatch';
    return (postApi(information, reactionLink))
}

const editUser = async (state, id) => {
    const userLink = '/users/' + id

    return (putApi(state, userLink));

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

const getOnePet = (id) => {
    const getOnePetLink = '/pets/' + id
    return (getApi(getOnePetLink));
}

const getPets = () => {
    const getPets = '/pets';
    return (getApi(getPets));
}

const getPetsNotWatched = (id) => {
    const getPets = '/user/' + id + '/petmatch';
    return (getApi(getPets));
}

export { login, createUser, editUser, createReaction, getOnePet, getPets, getPetsNotWatched }