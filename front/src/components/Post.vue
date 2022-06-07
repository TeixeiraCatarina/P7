<script>
import { getUrlAndHeaders } from "./../services/fetchOptions"
export default {
    name: "Post",
    data() {
        return { 
            content: "", 
            selectedImage: null
        }
    },
    methods: {
        handleFile(e) {   
            this.selectedImage = e.target.files[0]
        },
        handleClick() {  //event handler lorsqu'on click sur le bouton post 
            const { url, headers } = getUrlAndHeaders()
            const formData = new FormData()   // pour pouvoir faire un post avec et sans image
            formData.append("content", this.content)
            formData.append("image", this.selectedImage)
            const options = {
                headers, 
                method: "POST",
                body: formData
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
                    this.$router.go() 
                })
                .catch((err) => console.log("err:", err))
        }
    }
}
</script>

<template>
    <div class="form-floating ">
        <h3>Nouvelle publication</h3>
        <input class="form-control py-3" v-model="content"/>
    </div>

    <div class="d-flex">
        <label for="file-input" class="btn btn-secondary mt-1">Ajouter une image</label>
        <span v-if="selectedImage">{{ selectedImage.name }}</span>
        <input id="file-input" type="file" @change="handleFile" /> 
        <button @click="handleClick" type="button" class="btn btn-primary mt-1 ms-auto border">Post</button>
    </div>
</template>

<style scoped>
h3 {
    font-size: 1em;
    font-weight: bold;
    color: #4E5166;
    padding-top: 2rem;
    text-align: center;
}
#file-input {
    display: none;
}
.form-floating > div.form-control {
    content: "Ajouter un post";
    height: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
    min-height: 5rem
}
.form-floating > div.form-control:empty::before {
    content: "Ajouter un post";
    color: #a0a0a0;
}
.border {
  color: white;
  border-color: #FD2D01;
  background-color: #FD2D01;
}
.border:hover {
  color: white;
  border-color: #FD2D01;
  background-color: #FD2D01;
  transform: scale(1.01);
}
</style>