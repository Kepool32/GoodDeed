
export const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:5000`;

export const createApiConfig = () => {

    const token = localStorage.getItem('token');


    return token
        ? {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        : {};
};


export default createApiConfig;
