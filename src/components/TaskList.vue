<template>
  <div class="mdc-card">
    <ul v-show="tasks.length" class="mdc-list mdc-list--two-line" role="group" aria-label="List with checkbox items">
      <template v-for="(task, index) of tasks">
        <li
          :key="task.id"
          :class="{ 'task-completed': task.isCompleted }"
          class="mdc-list-item"
          role="checkbox"
          aria-checked="false"
          @click="changeTaskStatus(task)"
        >
          <span class="mdc-list-item__graphic">
            <div class="mdc-checkbox">
              <input
                v-model="task.isCompleted"
                type="checkbox"
                class="mdc-checkbox__native-control"
                id="demo-list-checkbox-item-1"
              >
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path
                    class="mdc-checkbox__checkmark-path"
                    fill="none"
                    d="M1.73,12.91 8.1,19.28 22.79,4.59"
                  ></path>
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
            </div>
          </span>
          <span class="mdc-list-item__text">
            <span class="mdc-list-item__primary-text">{{ task.vehicle }}</span>
            <span class="mdc-list-item__secondary-text">{{ $getFormattedDate(task.time) }}</span>
          </span>
        </li>
        <li
          v-if="index < $store.getters.tasks.length - 1"
          :key="index"
          role="separator"
          class="mdc-list-divider"
        ></li>
      </template>
    </ul>
    <h3 v-if="!tasks.length" class="mdc-typography--body1">Įrašų nėra</h3>
  </div>
</template>

<script>
import { MDCList } from "@material/list";

export default {
  name: "TaskList",

  props: {
    tasks: Array
  },

  mounted() {
    new MDCList(document.querySelector(".mdc-list"));
  },

  methods: {
    changeTaskStatus(task) {
      task.isCompleted = !task.isCompleted;
      this.$store
        .dispatch("updateTask", task)
        .then(() => {})
        .catch(() => {
          task.isCompleted = !task.isCompleted;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
	padding-left: 12px;
}

.mdc-list {
  cursor: pointer;
}

.mdc-card {
  width: fit-content;
  min-width: 500px;
}

.task-completed {
  color: lightgrey;
  text-decoration: line-through;
}
</style>
