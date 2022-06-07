<script>
import { getUrlAndHeaders } from "./../services/fetchOptions"
import axios from "axios"
export default {
  name: "AppNavbar",
  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    const token = localStorage.getItem("token")
    const originalEmail = localStorage.getItem("email")
    if (token != null) {
      this.isLoggedIn = true
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      this.$router.go()
    },
    deleteAccount: async function(e) {
      if(confirm("Veuillez confirmer la suppression")){ 
      const { url } = getUrlAndHeaders()
      const email = localStorage.getItem("email")
      console.log( email + "email" )
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        data: { source: email }
      }
      try {
        //var reponse = confirm("Veuillez confirmer la suppression")
        await axios.delete(url + "users/delete", options)
        localStorage.removeItem("token")
        this.$router.go()
      } catch (err) {
        const error = err.response.data.error
        this.error = error
        throw new Error("impossible de supprimer:" + error)
      }
      }
    }
  }
}
</script>

<template>
  <header class="p-3 bg text-white container-sm">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <router-link to="/home" class="nav-link color">Groupomania</router-link>
          </li>
        </ul>

        <div class="text-end">
          <button
            v-if="this.isLoggedIn"
            class="btn delete me-2"
            type="submit"
            @click="deleteAccount"
            onclick="confirmer()">
            Supprimer son compte
          </button>
      
          <button
            @click="this.logout"
            v-if="this.isLoggedIn"
            type="button"
            class="btn border me-2">
            Logout
          </button>
          <button v-if="!this.isLoggedIn" type="button" class="btn border me-2">Login</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
p {
  color: black;
}
.bg {
  background-color: white;
}
.color {
  color: #FD2D01;
  font-size: xx-large;
  font-weight: bold;
}
.color:hover {
  color: red;
}
.bi {
  vertical-align: -.125em;
  fill: currentColor;
  width: 6rem;
  height: 4rem; 
}
.border {
  color: white;
  border-color: #FD2D01;
  background-color: #FD2D01;
}
.border:hover {
  color: white;
  transform: scale(1.01);
}
.delete {
  color: white;
  border-color: #4E5166;
  background-color: #4E5166;
}
.delete:hover {
  color: red;
  transform: scale(1.01);
}
</style>