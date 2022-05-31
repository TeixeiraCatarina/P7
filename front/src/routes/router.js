import WallPage from "../pages/WallPage.vue"
import LoginPage from "../pages/LoginPage.vue"
    
import { createRouter, createWebHistory } from "vue-router"

// Fabrications des routes
const routes = [ 
    { name: "login", path: "/login", component: LoginPage },
    { name: "signup", path: "/signup", component: LoginPage},
    { name: "home", path: "/home", component: WallPage },
    { path: "/", redirect: "/home" }
] 
// Créer une instance de router 
const router = createRouter({ history: createWebHistory(), routes })

// Utilisation de Navigation Guards
router.beforeEach((to, from) => {
    if (isLoginRequired(to)) {  
        return router.push("/login")
    }
})
function isLoginRequired(to){
    if (!isPrivatePage(to)) return false   // si on est sur une page public alors pas besoin de se connecter 
    if (!isTokenInCache()) return true   // si on est sur page privée + pas de token en cache alors besoin de se connecter
    return false
}

function isPrivatePage(to){
    const publicPages = ["/login", "/signup"]
    return !publicPages.includes(to.path)
}

function isTokenInCache(){
    return localStorage.getItem("token") != null
}

export { router }