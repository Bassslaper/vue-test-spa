<template>
  <nav class="teal darken-1">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo">Task Manager</router-link>
        <ul class="right hide-on-med-and-down">
          <router-link 
            tag="li"
            to="/"
            exact=""
            active-class="active"
          >
            <a href="#">Создать задачу</a>
          </router-link>

          <router-link 
            tag="li"
            to="/list"
            active-class="active"
          >
            <a href="#">Список задач</a>
          </router-link>
          
        </ul>
      </div>
    </nav>
</template>

<script>
    export default {
      
    }
</script>

<style lang="scss" scoped>
   @media only screen and (max-width: 992px) {
    .hide-on-med-and-down {
      display: block !important;
    }
  }
  
  nav {
    padding: 0 2rem;
  }

  .brand-logo {
    font-weight: bold;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    font-size: 1.2rem;
  }

</style>