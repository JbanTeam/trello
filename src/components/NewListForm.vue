<template>
  <v-flex sm3 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create list</div>
        <div>
          <v-form
            v-if="!creatingList"
            v-model="validList"
            @submit.prevent="onCreateList"
            @keydown.prevent.enter
          >
            <v-text-field v-model="list.name" :rules="notEmptyRules" label="Name" required></v-text-field>
            <v-btn color="success" type="submit" :disabled="!validList">Create list</v-btn>
          </v-form>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
import { notEmptyRules } from '@/validators';

export default {
  props: ['creatingList', 'createList'],
  data() {
    return {
      validList: false,
      list: {
        name: '',
        order: 0,
        archived: false
      },
      notEmptyRules
    };
  },
  methods: {
    async onCreateList() {
      if (this.validList) {
        await this.createList(this.list);
        this.list = {
          name: '',
          order: 0,
          archived: false
        };
      }
    }
  }
};
</script>

<style>
</style>
