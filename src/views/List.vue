/* eslint-disable vue/return-in-computed-property */
/* eslint-disable vue/no-unused-vars */
<template>
  <div>
    <h1>Список задач</h1>
    <div class="row filter-block" >
      <div class="input-field col s6">
       
        <select ref="select" v-model="filter">
            <option value="" disabled selected>Выберите статус задачи</option>
            <option value="all">Все</option>
            <option value="active">Активная</option>
            <option value="completed">Завершенная</option>
            <option value="outdated">Просроченная</option>
        </select>
        <label>Фильтр статусов задач</label>
      </div>
      
      <div class="col s6">
        <button v-if="filter" class="btn blue" type="button" @click="filter=null">Очистить фильтр</button>
      </div> |
    </div>
   

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
          v-for="(task, idx) of displayTasks"
          :key="task.id"
        >
        <td>{{idx + 1}}</td>
        <td>{{task.title}}</td>
        <td>{{ new Date(task.date).toLocaleDateString()}}</td>
        <td class="list-td_desc" :title="task.description"><div class="list-description">{{task.description}}</div></td>
        <td class="list-td_status" v-if="task.status === 'completed'"><strong>{{task.status}}</strong></td>
        <td class="list-td_status" v-else>{{task.status}}</td>
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
    data: () =>  ({
      filter: null,

    }),

    computed: {
      tasks() {
        return this.$store.getters.tasks
      },
      // eslint-disable-next-line vue/return-in-computed-property
      displayTasks() {
        return this.tasks.filter(el => {
          if(!this.filter || this.filter === 'all') {
            this.filter = null;
            return true;
          }
          return el.status === this.filter

        });
      }
    },
    mounted() {
      // eslint-disable-next-line no-undef
      M.FormSelect.init(this.$refs.select, {});
    }
  }
</script>

<style scoped>
  .filter-block {
    display: flex;
    align-items: center;
  }

  .list-td_desc {
    max-width: 350px;
  }

  .list-td_status {
    min-width: 100px;
  }

  .list-description {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>