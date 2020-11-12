import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if(new Date(task.date < new Date())) {
        task.status = 'outdated'
      }
      return task
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask(state, {id, description, date}) {
      const tasks = state.tasks.concat();
      const idx = tasks.findIndex(el => el.id === id);

      const task = tasks[idx];
      const status = new Date(date) > new Date() ? 'active' : 'outdated';

      tasks[idx] = {...task, date, description, status};

      state.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex(el => el.id === id);
      state.tasks[idx].status = 'completed';
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }

  },
  actions: {
    createTask( { commit }, task ) {
      commit('createTask', task);
    },
    editTask({commit}, task) {
      commit('editTask', task)
    },
    completeTask({commit}, id) {
      commit('completeTask', id)
    }
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find( el => el.id === id) 
  }
});
