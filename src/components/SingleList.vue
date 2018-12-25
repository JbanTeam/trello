<template>
  <v-flex sm3 pa-2>
    <v-card
      @dragover="setDroppingList($event, list)"
      :class="{'green lighten-4': droppingList == list}"
    >
      <v-card-title primary-title>
        <v-layout column>
          <v-flex xs12>
            <div class="headline">{{list.name}}</div>
          </v-flex>

          <template v-if="cardsByListId[list._id]">
            <v-flex xs12 v-for="card in cardsByListId[list._id]" :key="card._id" class="pa-1">
              <v-card
                draggable="true"
                @dragstart="startDraggingCard(card)"
                @dragend="dropCard"
                color="blue lighten-3"
              >
                <v-layout>
                  <v-flex xs12>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{card.title}}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <create-card
          :listId="list._id"
          :boardId="$route.params.id"
          :user="user"
          :createActivity="createActivity"
        ></create-card>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import CreateCard from '@/components/CreateCard';

export default {
  props: [
    'list',
    'setDroppingList',
    'droppingList',
    'cardsByListId',
    'startDraggingCard',
    'dropCard',
    'createActivity',
    'user'
  ],
  components: {
    CreateCard
  }
};
</script>
