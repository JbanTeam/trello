<template>
  <v-flex sm3 pa-2>
    <v-card>
      <v-img :src="board.background" height="200" aspect-ratio="1.7"></v-img>
      <v-card-title primary-title>
        <div class="headline">{{board.name}}</div>
      </v-card-title>
      <v-card-actions>
        <v-btn
          color="primary"
          class="elevation-0"
          :to="{name: 'board', params: {id: board._id}}"
        >Go!</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['board']
};
</script>
