<script>
import Avatar from "./ui/Avatar.vue"
export default {
    name: "Comment",
    components: { 
        Avatar 
    },
    props: {
        email: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    }
}
</script>

<template>
    <div class="d-flex gap-3">
        <Avatar/>
        <div class="flex-comumn comment_text p-1 mb-2">
            <p class="email">{{ email }}</p>
            <p>{{ content + " - " + createdAt }}</p>
        </div>
    </div>
</template>

<style scoped>
.comment_text {
    background-color: #f2f2f2;
    border-radius: 3px;
    width: 100%;
}
.card-body > .d-flex {
    margin-bottom: 1rem;
}
.d-flex p {
    margin-bottom: 0;
}
.d-flex p:nth-child(1) {
    font-weight: 500;
}
.email {
    color: #4E5166;
}
</style>