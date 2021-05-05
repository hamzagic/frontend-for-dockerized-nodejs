<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <p class="display-1 font-weight-bold mb-6">Clientes Inadimplentes</p>
        <v-text-field
          v-model="searchParam"
          @keyup.enter="getResults()"
          placeholder="Nome do cliente..."
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-col>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="titles" @click="orderResult('name')">
                Nome do cliente
              </th>
              <th class="titles" @click="orderResult('amount')">Valor</th>
              <th class="titles" @click="orderResult('date')">Desde</th>
            </tr>
          </thead>
          <tbody>
            <template>
              <tr v-for="client in clients" :key="client.id">
                <td>{{ client.name }}</td>
                <td>{{ client.amount }}</td>
                <td>{{ client.date }}</td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col>
      <div class="text-center">
        <v-pagination
          v-model="pagination.currentPage"
          :length="totalPages"
          @input="changePage()"
          @next="nextPage()"
          @previous="prevPage()"
        ></v-pagination>
      </div>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "ClientsList",

  data() {
    return {
      clients: [],
      pagination: {
        pages: 0,
        currentPage: 1,
      },
      page: 1,
      total: 0,
      limit: 5,
      offset: 0,
      searchParam: "",
    };
  },
  created() {
    this.getClients();
  },
  methods: {
    getClients(page) {
      if (typeof page === "undefined") page = 1;
      let offset = page == 1 ? this.offset : (page - 1) * this.limit;

      const payload = {
        limit: this.limit,
        offset: offset,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost/users", options)
        .then((res) => res.json())
        .then((data) => {
          this.clients = data.data;
          this.total = data.total;
          this.pagination.currentPage = page;
        })
        .catch((err) => console.log(err));
    },
    nextPage() {
      this.pagination.currentPage == this.totalPages
        ? this.pagination.currentPage
        : this.pagination.currentPage + 1;
      this.getClients(this.pagination.currentPage);
    },
    prevPage() {
      this.pagination.currentPage == 1
        ? this.total
        : this.pagination.currentPage - 1;
      this.getClients(this.pagination.currentPage);
    },
    changePage() {
      this.getClients(this.pagination.currentPage);
    },
    getResults(data) {
      let payload;
      if (data === "undefined") {
        payload = {
          fname: this.searchParam,
        };
      } else {
        payload = {
          param: data,
        };
      }

      console.log("dsfdsfs", data);

      const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch("http://localhost/search", options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.clients = data.data;
          this.total = data.total;
          this.pagination.currentPage = 1;
        })
        .catch((err) => console.log(err));
    },
    orderResult(data) {
      this.getResults(data);
    },
  },
  computed: {
    totalPages() {
      return this.total > 1 ? Math.ceil(this.total / this.limit) : this.total;
    },
  },
};
</script>

<style scoped>
.titles {
  cursor: pointer;
  font-size: 16px !important;
}
</style>
