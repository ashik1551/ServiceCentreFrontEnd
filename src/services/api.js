import axios from "axios"

const BASE_URL="http://127.0.0.1:8000/api/"

function getHeader(){
    
    let accessToken=localStorage.getItem("access")

    let headers={
        "Authorization":"Bearer "+accessToken
    }

    return headers
}

export async function addCustomerApi(data){

    return await axios.post(BASE_URL+'customers/',data,{"headers":getHeader()})

}

export async function updateCustomerApi(id,data){

    return await axios.put(BASE_URL+`customers/${id}/`,data,{"headers":getHeader()})

}

export async function listCustomerApi(){

    return await axios.get(BASE_URL+'customers/',{"headers":getHeader()},{"headers":getHeader()})
    
}

export async function retrieveCustomerApi(id){

    return await axios.get(BASE_URL+`customers/${id}/`,{"headers":getHeader()})
}

export async function deleteCustomerApi(id){

    return await axios.delete(BASE_URL+`customers/${id}/`,{"headers":getHeader()})
}

export async function addWorkApi(id,data){

    return await axios.post(BASE_URL+`customers/${id}/work/`,data,{"headers":getHeader()})
}


export async function retrieveWorkApi(id){

    return await axios.get(BASE_URL+`work/${id}/`,{"headers":getHeader()})

}

export async function updateWorkApi(id,data){

    return await axios.put(BASE_URL+`work/${id}/`,data,{"headers":getHeader()})

}

export async function deleteWorkApi(id){

    return await axios.delete(BASE_URL+`work/${id}/`,{"headers":getHeader()})

}

export async function getTokenApi(data){

    return await axios.post(BASE_URL+"token/",data)
    
}