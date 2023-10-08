
const fetchAccessToken = async (url) => {

    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

    const data = await fetch(url, {
        /*  headers : {
             authorization : `Bearer ${refreshToken}`
         }, */
        headers: { 
            'authorization' : `Bearer ${refreshToken}`,
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    const response = await data.json();
    return await response;
}

export default fetchAccessToken;