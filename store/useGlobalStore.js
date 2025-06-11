import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isLoading: false,
    error: null,
    success: null
  }),
  actions: {
    setLoading(loading) {
      this.isLoading = loading;
    },
    setError(error) {
      this.error = error;
      setTimeout(() => {
        this.error = null;
      }, 5000);
    },
    setSuccess(message) {
      this.success = message;
      setTimeout(() => {
        this.success = null;
      }, 5000);
    }
  }
});