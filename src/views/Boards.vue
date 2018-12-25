<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center wrap>
        <v-progress-circular :size="70" :width="7" indeterminate color="primary" v-if="creating"></v-progress-circular>

        <template v-if="!loading">
          <board-list v-for="board in boards" :key="board._id" :board="board"></board-list>
        </template>

        <new-board-form :creating="creating" :createBoard="createBoard"></new-board-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import BoardList from '@/components/BoardList';
import NewBoardForm from '@/components/NewBoardForm';

export default {
  name: 'boards',
  components: {
    BoardList,
    NewBoardForm
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapState('boards', {
      loading: 'isFindPending',
      creating: 'isCreatePending'
    }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      return this.user
        ? this.findBoardsInStore({
            query: {
              ownerId: this.user.userId
            }
          }).data
        : [];
    }
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    async createBoard(board) {
      const { Board } = this.$FeathersVuex;
      const newBoard = new Board(board);
      // console.log(newBoard);
      await newBoard.save();
    }
  },
  mounted() {
    this.findBoards({ query: {} });
  }
};
</script>
