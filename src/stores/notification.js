import { ref } from 'vue';

export const notification = ref({
  show: false,
  message: '',
  type: 'error'
});

export function useNotification() {
  const showNotification = (message, type = 'error') => {
    notification.value = {
      show: true,
      message,
      type
    };

    setTimeout(() => {
      notification.value.show = false;
    }, 5000);
  };

  return {
    notification,
    showNotification
  };
}