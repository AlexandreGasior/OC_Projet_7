<template>
    <div>
        <button class="post__modify" v-if="post.userId === userId || userRole === 'admin'" v-on:click="modifyPost(post.id)">
                <font-awesome-icon icon="pen" /> Modifier
        </button>
        <button class="post__delete" v-if="post.userId === userId || userRole === 'admin'" v-on:click="deletePost(post.id)">
            <font-awesome-icon icon="trash" /> Supprimer
        </button>
    </div>
</template>