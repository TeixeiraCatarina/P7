<script>
function submitForm(email, password, router) {
  const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
  const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/auth/login`

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }
  fetch(url, options)
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
      localStorage.setItem("token", token)
      localStorage.setItem("email", email)
      router.go("/home")
    })
    .catch((err) => {
      console.error(err)
    })
}

export default {
  name: "LoginPage",
  data,
  methods: {
    submitForm,
    isFormValid
  },
  watch: {
    username(value) {
      const isValueEmpty = value === ""
      this.isFormValid(!isValueEmpty)
      this.error = null
    },
    password(value) {
      const isValueEmpty = value === ""
      this.isFormValid(!isValueEmpty)
      this.error = null
    }
  }
}

function data() {
  return { 
    username: "catarina@hotmail.com", 
    password: "polm", 
    hasInvalidCredentials: false,
    error: null
  }
}

function isFormValid(bool) {
  this.hasInvalidCredentials = !bool
}
</script>

<template>
<main class="form-signin">
  <form :class="this.hasInvalidCredentials ? 'hasErrors' : ''">
    <img class="mb-4 d-block mx-auto" src="../../public/favicon.ico" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input 
        type="email" 
        class="form-control" 
        id="floatingInput" 
        placeholder="name@example.com"
        v-model="username"
        required="true"
        @invalid="isFormValid
        "
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
        @invalid="isFormValid
        "
      />
      <label for="floatingPassword">Password</label>
    </div>

    <div v-if="hasInvalidCredentials" class="error-msg">Veuillez remplir tous les chapms</div>
    <div v-if="!hasInvalidCredentials && error" class="error-msg">{{ error }}</div>

    <button 
      class="w-100 btn btn-lg btn-primary" 
      type="submit" 
      @click.prevent="() => submitForm(this.username, this.password, this.$router)"
      :disabled="hasInvalidCredentials">Sign in
    </button>
    <p class="mt-5 mb-3 text-muted">Value: {{ username }}</p>
    <p class="mt-5 mb-3 text-muted">Password: {{ password }}</p>
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
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
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
