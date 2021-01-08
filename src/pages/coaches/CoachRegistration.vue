<template>
  <section>
    <base-card>
      <h2>Register as a coach</h2>
      <coach-form @save-data="registerCoach"> </coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm';

export default {
  components: {
    CoachForm
  },
  methods: {
    registerCoach(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    }
  }
};
</script>
