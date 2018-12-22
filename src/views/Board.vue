<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
          color="primary"
          v-if="loadingBoard || loadingLists"
        ></v-progress-circular>
        <v-flex xs12>
          <h2 v-if="board">{{board.name}}</h2>
        </v-flex>
        <v-flex sm3 v-if="!loadingLists" v-for="list in lists" :key="list._id" pa-2>
          <v-card>
            <v-card-title primary-title>
              <v-layout column>
                <v-flex xs12>
                  <div class="headline">{{list.name}}</div>
                </v-flex>
                <v-flex
                  xs12
                  v-if="cardsByListId[list._id]"
                  v-for="card in cardsByListId[list._id]"
                  :key="card._id"
                  class="pa-1"
                >
                  <v-card>
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
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <create-card :listId="list._id" :boardId="$route.params.id"></create-card>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm3 pa-2>
          <v-card>
            <v-card-title primary-title style="flex-direction: column;">
              <div class="headline">Create list</div>
              <div>
                <v-form
                  v-if="!creatingList"
                  v-model="validList"
                  @submit.prevent="createList"
                  @keydown.prevent.enter
                >
                  <v-text-field v-model="list.name" :rules="notEmptyRules" label="Name" required></v-text-field>
                  <v-btn color="success" type="submit" :disabled="!validList">Create list</v-btn>
                </v-form>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

import CreateCard from './CreateCard';

export default {
  name: 'board',
  components: {
    CreateCard
  },
  data() {
    return {
      validList: false,
      board: {},
      list: {
        name: '',
        order: 0,
        archived: false
      },
      notEmptyRules: [v => !!v || 'Cannot be empty']
    };
  },
  computed: {
    ...mapState('boards', {
      loadingBoard: 'isGetPending'
    }),
    ...mapState('lists', {
      loadingLists: 'isFindPending',
      creatingList: 'isCreatePending'
    }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    lists() {
      return this.findListsInStore({
        boardId: this.$route.params.id
      }).data;
    },
    cards() {
      return this.findCardsInStore({
        boardId: this.$route.params.id
      }).data;
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || [];
        byId[card.listId].push(card);
        return byId;
      }, {});
    }
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    ...mapActions('cards', { findCards: 'find' }),
    createList() {
      if (this.validList) {
        const { List } = this.$FeathersVuex;
        this.list.boardId = this.$route.params.id;
        const list = new List(this.list);
        list.save();
        this.list = {
          name: '',
          order: 0,
          archived: false
        };
      }
    }
  },
  mounted() {
    this.getBoard(this.$route.params.id).then(response => {
      this.board = response.data || response;
    });
    this.findLists({
      query: {
        boardId: this.$route.params.id
      }
    }).then(response => {
      const lists = response.data || response;
    });
    this.findCards({
      query: {
        boardId: this.$route.params.id
      }
    }).then(response => {
      const cards = response.data || response;
    });
  }
};
</script>
