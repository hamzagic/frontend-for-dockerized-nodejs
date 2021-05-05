<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <ClientsList/>
    </v-main>
  </v-app>
</template>

<script>
import ClientsList from './components/ClientsList';

export default {
  name: 'App',

  components: {
    ClientsList,
  },

  data: () => ({
    //
  }),
};
</script>
