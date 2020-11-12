<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{task.title}}</h1>

      <form @submit.prevent="submitHendler">
         
        <div class="chips" ref="chips"></div>

        <div class="input-field">
              <textarea  contenteditable="true" v-model="description" id="description" class="materialize-textarea"></textarea>
              <label for="description">Описание</label>
              <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
        </div>  

        <input type="text" ref="datepicker">
        <div v-if="task.status !== 'completed'">
          <button class="btn" type="submit" style="margin-right: 1rem">Редактировать</button>
          <button class="btn blue" type="button" @click="completeTask" >Завершить задачу</button>
        </div>
      </form> 

    </div>
    <p v-else>Задача не найдена</p>
  </div>
</template>

<script>
  export default {

      computed: {
        task() {
          return this.$store.getters.taskById(+this.$route.params.id);
        }
      },

      data: () => ({
        description: '',
        chips: null,
        date: null
      }),

      mounted() {
        this.description = this.task.description;

        // eslint-disable-next-line no-undef
        this.chips = M.Chips.init(this.$refs.chips, {
          placeholder: 'Теги задач',
          data: this.task.tags
        });

        // eslint-disable-next-line no-undef
        this.date = M.Datepicker.init(this.$refs.datepicker, {
          format: 'dd.mm.yyyy',
          defaultDate: new Date(this.task.date),
          setDefaultDate: true
        });

        setTimeout(() => {
          // eslint-disable-next-line no-undef
          M.updateTextFields();
        }, 0);
      },
      methods: {
        submitHendler() {
          this.$store.dispatch('editTask', {
            id: this.task.id,
            description: this.description,
            date: this.date.date
          });

          this.$router.push('/list');
        },

        completeTask() {
          this.$store.dispatch('completeTask', this.task.id);
          this.$router.push('/list');
        }
      },
    
      destroyed() {
          if(this.date && this.date.destroy) {
            this.date.destroy();
          }

          if(this.chips && this.chips.destroy) {
            this.chips.destroy();
          }
      } 

   }
</script>

<style scoped>
  .materialize-textarea {
    display: block;
    height: 100%;
    overflow: auto;
  }
</style>