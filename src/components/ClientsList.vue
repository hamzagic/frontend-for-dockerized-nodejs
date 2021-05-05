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
              <th class="titles" @click="getClients(undefined, 'name')">
                Nome do cliente
              </th>
              <th class="titles" @click="getClients(undefined, 'amount')">
                Valor
              </th>
              <th class="titles" @click="getClients(undefined, 'date')">
                Desde
              </th>
            </tr>
          </thead>
          <tbody>
            <template>
              <tr v-for="client in clients" :key="client.id">
                <td>{{ client.name }}</td>
                <td>{{ formatAmount(client.amount) }}</td>
                <td>{{ formatDate(client.date) }}</td>
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
import formatAmount from '@/mixins/formatAmount';
import formatDate from '@/mixins/formatDate';

export default {
  name: "ClientsList",
  mixins: [formatAmount, formatDate],
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
      currentParam: ''
    };
  },
  created() {
    this.getClients();
    console.log('ddd', process.env);
  },
  methods: {
    getClients(page, param) {
      if (typeof page === "undefined") page = 1;
      let offset = page == 1 ? this.offset : (page - 1) * this.limit;

      let payload;

      if (!param) {
        payload = {
          limit: this.limit,
          offset: offset,
        };
      } else {
        payload = {
          limit: this.limit,
          offset: offset,
          param: param
        };
        this.currentParam = param;
      }

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
      this.getClients(this.pagination.currentPage, this.currentParam);
    },
    prevPage() {
      this.pagination.currentPage == 1
        ? this.total
        : this.pagination.currentPage - 1;
      this.getClients(this.pagination.currentPage, this.currentParam);
    },
    changePage() {
      this.getClients(this.pagination.currentPage, this.currentParam);
    },
    getResults(page) {
      if (typeof page === "undefined") page = 1;
      let offset = page == 1 ? this.offset : (page - 1) * this.limit;

      if (!this.searchParam) {
        this.getClients();
        return;
      }

      const payload = {
        fname: this.searchParam,
        offset: offset,
        limit: this.limit,
      };

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
          this.searchParam = "";
          this.clients = data.data;
          this.total = data.total;
          this.pagination.currentPage = 1;
        })
        .catch((err) => console.log(err));
    }
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
