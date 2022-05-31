const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/`

const headers = {  
    Authorization: `Bearer ${localStorage.getItem("token")}`,  // va chercher le token
    "Accept": "application/json",  // accepte aussi du json
}

function getUrlAndHeaders(){
    return {
        url, headers 
    }
}

export { getUrlAndHeaders }