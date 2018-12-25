<template>
  <v-flex sm3 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create board</div>
        <div>
          <v-form
            v-if="!creating"
            v-model="valid"
            @submit.prevent="onCreateBoard"
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
</template>

<script>
import { notEmptyRules } from '@/validators';

export default {
  props: ['creating', 'createBoard'],
  data() {
    return {
      valid: false,
      // creating: false,
      board: {
        name: '',
        background: ''
      },
      notEmptyRules
    };
  },
  methods: {
    async onCreateBoard() {
      if (this.valid) {
        await this.createBoard(this.board);
        this.board = {
          name: '',
          background: ''
        };
      }
    }
  }
};
</script>
