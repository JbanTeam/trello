<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs10>
        <v-layout row wrap>
          <v-flex xs12 v-if="boardsError">
            <v-alert type="error" :value="boardsError">{{boardsError.message}}</v-alert>
          </v-flex>
          <v-progress-circular
            :size="70"
            :width="7"
            indeterminate
            color="primary"
            v-if="loadingBoard || loadingLists"
          ></v-progress-circular>
          <v-flex xs12 v-if="!boardsError">
            <v-layout row wrap>
              <v-flex xs12>
                <h2 v-if="board">{{board.name}}</h2>
              </v-flex>

              <template v-if="!loadingLists">
                <single-list
                  v-for="list in lists"
                  :key="list._id"
                  :list="list"
                  :setDroppingList="onSetDroppingList"
                  :droppingList="droppingList"
                  :cardsByListId="cardsByListId"
                  :startDraggingCard="startDraggingCard"
                  :dropCard="dropCard"
                  :createActivity="createActivity"
                  :user="user ? user.user : {}"
                ></single-list>
              </template>

              <new-list-form :creatingList="creatingList" :createList="createList"></new-list-form>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2>
        <activities :activitiesByDate="activitiesByDate"></activities>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import Activities from '@/components/Activities';
import NewListForm from '@/components/NewListForm';
import SingleList from '@/components/SingleList';

export default {
  name: 'board',
  components: {
    Activities,
    NewListForm,
    SingleList
  },
  data() {
    return {
      activitiesOpen: true,
      board: {},
      paramsId: this.$route.params.id
    };
  },
  computed: {
    ...mapState('board', ['droppingList', 'draggingCard']),
    ...mapState('boards', {
      loadingBoard: 'isGetPending',
      boardsError: 'errorOnGet'
    }),
    ...mapState('lists', {
      loadingLists: 'isFindPending',
      creatingList: 'isCreatePending',
      listsError: 'errorOnfind'
    }),
    ...mapState('cards', {
      cardsError: 'errorOnfind'
    }),
    ...mapState('auth', {
      user: 'payload'
    }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    ...mapGetters('activities', { findActivitiesInStore: 'find' }),
    lists() {
      return this.findListsInStore({
        boardId: this.$route.params.id
      }).data.filter(list => {
        return list.boardId == this.paramsId;
      });
    },
    cards() {
      return this.findCardsInStore({
        boardId: this.$route.params.id
      }).data;
    },
    activities() {
      return this.findActivitiesInStore({
        boardId: this.$route.params.id
      }).data.filter(activity => {
        return activity.boardId == this.paramsId;
      });
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || [];
        byId[card.listId].push(card);
        return byId;
      }, {});
    },
    activitiesByDate() {
      return this.activities.slice().reverse();
    }
  },
  methods: {
    ...mapMutations('board', ['setDroppingList', 'setDraggingCard']),
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    ...mapActions('cards', { findCards: 'find' }),
    ...mapActions('activities', { findActivities: 'find' }),
    async createList(list) {
      const { List } = this.$FeathersVuex;
      list.boardId = this.$route.params.id;
      const newList = new List(list);
      await newList.save();
      this.createActivity(
        `**${this.user.user.displayName}** created List **${newList.name}**`
      );
    },
    async createActivity(text) {
      const { Activity } = this.$FeathersVuex;
      const activity = new Activity();
      activity.text = text;
      activity.boardId = this.$route.params.id;
      activity.userId = this.user.userId;
      await activity.save();
    },
    startDraggingCard(card) {
      this.setDraggingCard(card);
    },
    onSetDroppingList(event, list) {
      this.setDroppingList(list);
      event.preventDefault();
    },
    async dropCard() {
      if (this.droppingList) {
        if (this.draggingCard.listId !== this.droppingList._id) {
          const fromList = this.lists.find(
            list => list._id === this.draggingCard.listId
          );
          const toList = this.lists.find(
            list => list._id === this.droppingList._id
          );
          this.draggingCard.listId = this.droppingList._id;
          await this.draggingCard.save();
          this.createActivity(
            `**${this.user.user.displayName}** moved card **${
              this.draggingCard.title
            }** from **${fromList.name}** to **${toList.name}**`
          );
        }
      }
      this.setDraggingCard(null);
      this.setDroppingList(null);
    }
  },
  mounted() {
    this.getBoard(this.$route.params.id);

    this.findLists({
      query: {
        boardId: this.$route.params.id
      }
    });
    this.findCards({
      query: {
        boardId: this.$route.params.id
      }
    });
    this.findActivities({
      query: {
        boardId: this.$route.params.id
      }
    });
  }
};
</script>
