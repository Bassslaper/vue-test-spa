/* eslint-disable vue/no-unused-vars */
<template>
  <div>
    <h1>Список задач</h1>
    <hr>

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>№</th>
          <th>Наименование</th>
          <th>Дата</th>
          <th>Описание</th>
          <th>Статус</th>
          <th>Открыть</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(task, idx) of tasks"
          :key="task.id"
        >
        <td>{{idx + 1}}</td>
        <td>{{task.title}}</td>
        <td>{{ new Date(task.date).toLocaleDateString()}}</td>
        <td class="list-td_desc" :title="task.description"><div class="list-description">{{task.description}}</div></td>
        <td>{{task.status}}</td>
        <td>
          <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">
            Открыть
          </router-link>
        </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Нет задач</p>
  </div>
</template>

<script>
  export default {
    computed: {
      tasks() {
        return this.$store.getters.tasks
      }
    }
  }
</script>

<style scoped>
  .list-td_desc {
    max-width: 400px;
  }

  .list-description {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>