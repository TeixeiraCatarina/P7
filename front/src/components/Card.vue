<script>
import Comment from "./Comment.vue"
import Avatar from "./ui/Avatar.vue"
import { getUrlAndHeaders } from "./../services/fetchOptions"
export default {
    name: "Card",
    components: { 
        Comment,
        Avatar 
    },
    props: ["email", "content", "url", "comments", "id", "currentUser", "role", "createdAt"],   //pour que les composants puissent recevoir de l'information  
    
    data() {
        return {
            currentComment: null,   //pour récuperer ce qu'il y a dans l'input
            role: localStorage.getItem('role')
        }
    },
    mounted(){},
    methods: {
        addComment(e) {    //lorsqu'on click sur le bouton post
            console.log(this.currentComment)
            console.log(this.$props.id)
            const { url, headers } = getUrlAndHeaders()
            const options = {
                headers: { ...headers, "Content-Type": "application/json" },  
                method: "POST",
                body: JSON.stringify({
                    comment: this.currentComment
                })
            }
            fetch(url + "posts/" + this.$props.id, options)   
                .then((res) => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        throw new Error("Failed to fetch posts")
                    }
                })
                .then((res) => {
                    console.log("res:", res)
                    this.$router.go()  
                })
                .catch((err) => console.log("err:", err))
        },
        deletePost(e) {    
            const { url, headers } = getUrlAndHeaders()
            fetch(url + "posts/" + this.$props.id, {
                headers: { ...headers, "Content-Type": "application/json" },
                method: "DELETE"
            })
                .then((res) => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        throw new Error("Failed to delete post")
                    }
                })
                .then((res) => {
                    this.$router.go()
                })
                .catch((err) => console.log("err:", err))
        }
    }
}

</script>

<template>
    <div class="card mb-3 m-auto">
        <div class="card-header d-flex"> 
            <img src="../assets/images/apple-icon-57x57.png" class="rounded-circle shadow-4" alt="avatar"/>
            <span>{{ email }}</span>
            <div v-if="currentUser === email || role == 'admin'" class="delete" @click="deletePost">
                Supprimer 
            </div>
        </div>

        <img v-if="url" :src="url" class="card-img-top" alt="..." />
        <div class="card-body">
            <p class="card-text">
                {{ content + " - " + createdAt }}
            </p>
            <div v-for="comment in comments">
                <Comment 
                    :email="comment.user.email" 
                    :content="comment.content"
                    :createdAt="comment.createdAt">
                </Comment>
            </div>

            <div class="d-flex gap-1">
                <Avatar></Avatar>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Commentaire" 
                    aria-label="Commentaire"
                    v-model="currentComment"
                />
                <button type="button" class="btn border me-2" @click="addComment">Post</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width:768px) {
    .card {
    width: 70%;
    }
}
.card-header img {
    width: 30px;
}
.delete {
    margin-left: auto;
    color: #4E5166;
}
.delete:hover {
    cursor: pointer;
    color: rgb(193, 57, 57);
    transform: scale(1.1);
}
.delete::before {
    font-size: 10px;
}
img {
    margin-right: 1rem;
    
}
.border {
    border: 1px solid #dee2e6;
    color: white;
    border-color: #FD2D01;
    background-color: #FD2D01;
}
.border:hover {
    transform: scale(1.01);
    color: white;
}
</style>