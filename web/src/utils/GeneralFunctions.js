
export const setAuthorizationHeader = (authorization) => {
    localStorage.setItem("authorization", "bearer " + authorization);
};

export const getAuthorizationHeader = () => {
    return localStorage.getItem("authorization");
};

export const clearFullLocalStorage = () => {
    localStorage.clear();
};