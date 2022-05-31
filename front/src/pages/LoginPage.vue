<script>
import { getUrlAndHeaders } from "./../services/fetchOptions"
import axios from "axios"
export default {
  name: "LoginPage",
  data() {
    return { 
      //username: "groupomania@hotmail.com", 
      //password: "polm", 
      //confirmPassword: "polm",
      hasInvalidCredentials: false,
      error: null,
      isLoginMode: true   //par default sera true vu que la plupart du temps on voudra ce connecter -> mode login
    }
  },
  methods: {
    loginUser,
    setFormValidity,
    toggleLogin() {
      this.isLoginMode = !this.isLoginMode    //isloginmode deviendra la contraire de isloginmode
    },
    signUp: async function(email, password, confirmPassword, router) {
      const { url } = getUrlAndHeaders()
      const body = JSON.stringify({ 
          email, 
          password, 
          confirmPassword
      })
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
      try {
        await axios.post(url + "users/signup", body, options)
        this.$router.go("/")
      } catch (err) {
        const error = err.response.data.error
        this.error = error
        throw new Error("Failed to signup:" + error)
      }
    }
  },
  watch: {
    username(value) {
      const isValueEmpty = value === ""
      this.setFormValidity(!isValueEmpty)
      this.error = null
    },
    password(value) {
      const isValueEmpty = value === ""
      this.setFormValidity(!isValueEmpty)
      this.error = null
    }
  }
}

function setFormValidity(bool) {
  this.hasInvalidCredentials = !bool
}

function loginUser(email, password, router, store) {
  const { url } = getUrlAndHeaders()
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }
  fetch(url + "users/", options)
    .then((res) => {
      if (res.ok) return res.json()
      res.text().then((err) => {
        const { error } = JSON.parse(err)
        this.error = error
        throw new Error(error)
      })
    })
    .then((res) => {
      const token = res.token
      const role = res.role

      localStorage.setItem("token", token)
      localStorage.setItem("email", email)
      localStorage.setItem("role", role)

      let tokenInCache
      while (tokenInCache == null) {
        tokenInCache = localStorage.getItem("token")
      }
      this.$router.push("/home")
    })
    .catch((err) => {
      console.error(err)
    })
}
</script>

<template>
  <main class="form-signin">
    <form :class="this.hasInvalidCredentials ? 'hasErrors' : ''">
      <img class="mb-4 d-block mx-auto" src="./../assets/images/apple-icon-152x152.png" alt="" width="72" height="57">
      <h1 class="h3 mb-3 fw-normal d-flex">
        {{ this.isLoginMode ? "Se connecter" : "S'inscrire" }}
      </h1>

      <div class="form-floating">
        <input 
          type="email" 
          class="form-control" 
          id="floatingInput" 
          placeholder="name@example.com"
          v-model="username"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input 
          type="password" 
          class="form-control" 
          id="floatingPassword" 
          placeholder="Password"
          v-model="password"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <!-- partie signup -->
      <div v-if="!isLoginMode" class="form-floating">
        <input 
          type="password" 
          class="form-control" 
          placeholder="Confirm password"
          v-model="confirmPassword"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div v-if="hasInvalidCredentials" class="error-msg">Veuillez remplir tous les chapms</div>
      <div v-if="!hasInvalidCredentials && error" class="error-msg">{{ error }}</div>

      <!--ici le IsLoginMode permet de faire afficher ce bouton quand on veut se connecter -->
      <button  
        v-if="isLoginMode"  
        class="w-100 btn btn-lg btn border me-2" 
        type="submit" 
        @click.prevent="
          () => loginUser(this.username, this.password, this.$router, this.usersStore)
        "
        :disabled="hasInvalidCredentials">
        Se connecter 
      </button>

      <!-- ici on veut le contarire: le bouton s'affiche seulement quand on veut s'inscrire -->
      <button  
        v-else  
        class="w-100 btn btn-lg btn border me-2" 
        type="submit" 
        @click.prevent="
          () => signUp(this.username, this.password, this.confirmPassword, this.$router)
        "
        :disabled="hasInvalidCredentials">
        S'inscrire 
      </button>
      <p class="mt-1 mb-1" @Click.prevent="toggleLogin">
        <a class="color" href="">{{ this.isLoginMode ? "Créer un compte !" : "Se connecter" }}</a>
      </p>
    </form>
  </main>
</template>

<style scoped>
.error-msg {
  color: red;
}
html, body {
    height: 100%;
}
.color {
  color: #cc0000;
}
body {
  align-items: center;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.button[type="submit"] {
  margin-top: 1rem;
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
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>
