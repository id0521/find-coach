<template>
  <base-dialog :show="!!error" @close="handleError" title="An error occurred!">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequests">
        <request-item
          v-for="req in requests"
          :key="req.id"
          :message="req.message"
          :email="req.email"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet...</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem';

export default {
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: ''
    };
  },
  computed: {
    requests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    }
  },
  methods: {
    async getRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/getRequests');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
        console.log(this.error);
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = '';
    }
  },
  created() {
    this.getRequests();
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
