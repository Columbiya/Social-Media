import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '2fd5b602-294c-435c-82ff-14577d02fb67'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const usersAPI = {
    getUsers(usersPerPage = 4, page = 1) {
        return instance.get(`users?count=${usersPerPage}&page=${page}`)
                        .then(response => response.data);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
                        .then(response => response.data);
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
                        .then(response => response.data);
    },

    updateStatus(status) {
        return instance.put(`profile/status`, { status })
                        .then(response => response.data);
    },
    updatePhoto(file) {
        const data = new FormData();
        data.append('image', file);
        return instance.put('profile/photo', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        });
    },
    updateProfile(profile) {
        return instance.put('profile', profile)
                        .then(response => response.data);
    }   
};

export const authAPI = {
    authorize() {
        return instance.get('auth/me')
                        .then(response => response.data);
    },

    getProfile(id) {
        console.warn('Outdated method. Please use profileAPI');
        return profileAPI.getProfile(id);
    },

    login(email, password, rememberMe, captcha) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
                        .then(response => response.data);
    },

    logout() {
        return instance.delete('auth/login')
                        .then(response => response.data);
    }
};

export const followAPI = {
    unfollow(id) {
        return instance.delete(`follow/${id}`)
                        .then(response => response.data);
    },
    
    follow(id) {
        return instance.post(`follow/${id}`, {})
                        .then(response => response.data);
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
                        .then(response => response.data);
    }
};