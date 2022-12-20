import cookies from 'js-cookie'

export function getToken(){
    return cookies.get("token");
}
export function setToken(token){
    return cookies.set("token" , token);
}
export function removeToken(){
    return cookies.remove("token");
}

