const ErrorMixin = {
  methods: {
    error(e = {}) {
      // Api error format is not standardized, so we add handling for the
      // different potential responses
      if (typeof e === 'string') { e = { errors: [e] }; }
      if (typeof e.errors === 'string') { e.errors = [ e.errors ]; }

      let defaultMessage = 'Something went wrong';
      let message = e.errors ? Object.values(e.errors)[0] : defaultMessage;
      this.$notify.error({
        title: 'Error',
        message: message || defaultMessage
      });
    },
  }
};

export default ErrorMixin;