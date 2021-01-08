<template>
  <base-dialog :show="!!error" @close="handleError" title="An error occurred!">
    <p>{{ error }}</p>
  </base-dialog>
  <section><coach-filter @change-filter="setFilters"></coach-filter></section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="getCoaches">Refresh</base-button>
        <base-button link to="/auth?redirect=register" v-if="!isAuthenticated"
          >Login to register as coach</base-button
        >
        <base-button
          v-if="!isCoach && !isLoading && isAuthenticated"
          link
          to="/register"
        >
          Register as Coach
        </base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :areas="coach.areas"
          :rate="coach.hourlyRate"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      },
      isLoading: false,
      error: null
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if (this.filters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.filters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.filters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.filters = updatedFilters;
    },
    async getCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/getCoaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
        console.log(error);
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.getCoaches();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
