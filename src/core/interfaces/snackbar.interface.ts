export interface Snackbar {
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
}
