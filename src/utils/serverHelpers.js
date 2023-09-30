import { backendUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route,username,email,password) =>{
    const response = await fetch(backendUrl + route,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'projectId': 'f104bi07c490'
        },
        body: JSON.stringify({
            name: username,
            email: email,
            password: password,
            appType: 'music',
        }),
    });
    const formatedResponse = await response.json();
    return formatedResponse;
};

export const makeAuthenticatedGETRequest = async(route) =>{
    const token = getToken();
    console.log("maheash",token);
    const response = await fetch(backendUrl + route, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            'Authorization': `Bearer ${token}`,
            'projectId': 'f104bi07c490',
        },
    });
    const formatedResponse = await response.json();
    return formatedResponse;
}

const getToken = () => {
    const accessToken = localStorage.getItem("token");

    return accessToken;
};