import router from '@/router';

const actions = {
  async login({ dispatch }, { user, valid }) {
    if (valid) {
      dispatch(
        'auth/authenticate',
        {
          strategy: 'local',
          ...user
        },
        {
          root: true
        }
      )
        .then(async () => {
          router.push('/boards');
        })
        .catch(err => {
          console.error('Auth error', err);
        });
    }
  }
};

export default {
  namespaced: true,
  actions
};
