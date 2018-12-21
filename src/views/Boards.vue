<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center wrap>
        <v-progress-circular :size="70" :width="7" indeterminate color="primary" v-if="creating"></v-progress-circular>
        <v-flex sm3 v-if="!loading" v-for="board in boards" :key="board._id" pa-2>
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
        <v-flex sm3 pa-2>
          <v-card>
            <v-card-title primary-title style="flex-direction: column;">
              <div class="headline">Create board</div>
              <div>
                <v-form
                  v-if="!creating"
                  v-model="valid"
                  @submit.prevent="createBoard"
                  @keydown.prevent.enter
                >
                  <v-text-field v-model="board.name" :rules="notEmptyRules" label="Name" required></v-text-field>
                  <v-text-field
                    v-model="board.background"
                    :rules="notEmptyRules"
                    label="Background"
                    required
                  ></v-text-field>
                  <v-btn color="success" type="submit" :disabled="!valid">Create</v-btn>
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

export default {
  name: 'boards',
  data() {
    return {
      valid: false,
      // creating: false,
      board: {
        name: '',
        background: ''
      },
      notEmptyRules: [v => !!v || 'Cannot be empty']
    };
  },
  computed: {
    ...mapState('boards', {
      loading: 'isFindPending',
      creating: 'isCreatePending'
    }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    }
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    createBoard() {
      if (this.valid) {
        const { Board } = this.$FeathersVuex;
        const board = new Board(this.board);
        console.log(board);
        board.save();
        this.board = {
          name: '',
          background: ''
        };
      }
    }
  },
  mounted() {
    this.findBoards({ query: {} }).then(response => {
      const boards = response.data || response;
    });
  }
};
</script>
