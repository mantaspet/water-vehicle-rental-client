<template>
  <div>
    <h1 class="mdc-typography--headline4">Užduočių sąrašas</h1>
    <TaskList :tasks="$store.getters.tasks"/>
  </div>
</template>

<script>
import TaskList from '../components/TaskList';

export default {
	name: "Tasks",
	
	components: {
		TaskList,
	},

  data() {
    return {

    };
  },

  created() {
    this.$store.dispatch("getTasks");
  },

  methods: {
    suspendClient(client) {
      this.$store.dispatch("suspendClient", client);
    }
  }
};
</script>

