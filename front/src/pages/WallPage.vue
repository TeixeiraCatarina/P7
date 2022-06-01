<script>
import Card from "../components/Card.vue"
import Post from "../components/Post.vue"
import { getUrlAndHeaders } from "./../services/fetchOptions.js"

export default {
    name: "WallPage",
    components: { 
        Card, 
        Post 
    },
    methods: {
        redirectToLoginIfNoToken(){
            const token = localStorage.getItem("token")
            if (token == null) {
                this.$router.push("/login")
            }
        }
    },
    mounted() {
        this.redirectToLoginIfNoToken()
        const { url, headers } = getUrlAndHeaders()
        const options = {
            headers: { ...headers }
        }
        fetch(url + "posts/", options)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error("Failed to fetch posts")
                }
            })
            .then((res) => {
                const { email, posts } = res
                this.posts = posts
                this.currentUser = email
                this.role = localStorage.getItem('role')
                this.createdAt = null
            })
            .catch((err) => console.log("err:", err))
    },
    data() {
        return {
            posts: [],
            currentUser: null,
            //role: localStorage.getItem('role')
        }
    }
}
</script>

<template>
    <div v-if="currentUser" class="container-sm color"> 
        <div class="col-sm-12">
            <h1 class="text-center">Bienvenue, {{ currentUser }}</h1>
        </div>
        <Post></Post>  
        
        <hr class="dropdown-divider mt-4"/>       <!-- barre de séparation -->

        <div v-for="post in posts">
            <Card 
                :currentUser="currentUser"
                :email="post.user.email" 
                :content="post.content" 
                :url="post.imageUrl" 
                :comments="post.comments"
                :id="post.id"
                :createdAt = "post.createdAt">
            </Card>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 1em;
    font-weight: bold;
    color: #4E5166;
    padding-top: 1rem;
}
.color {
    background-color: #f2f2f2;
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
</style>