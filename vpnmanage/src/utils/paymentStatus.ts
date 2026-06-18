export type PaymentStatus = 'configured' | 'pending' | 'unavailable';

export interface PaymentStatusNote {
  status: PaymentStatus;
  title: string;
  message: string;
  alertType: 'success' | 'warning' | 'error';
}

const paymentStatusNotes: Record<PaymentStatus, PaymentStatusNote> = {
  configured: {
    status: 'configured',
    title: 'Payment configured',
    message: 'Payment is configured for this subscription.',
    alertType: 'success',
  },
  pending: {
    status: 'pending',
    title: 'Payment pending',
    message: 'No active subscription payment is recorded for this account.',
    alertType: 'warning',
  },
  unavailable: {
    status: 'unavailable',
    title: 'Payment unavailable',
    message: 'Payment status is unavailable right now.',
    alertType: 'error',
  },
};

export function normalizePaymentStatus(status: unknown): PaymentStatus {
  if (status === 'configured' || status === 'pending' || status === 'unavailable') {
    return status;
  }

  return 'unavailable';
}

export function getPaymentStatusNote(status: PaymentStatus): PaymentStatusNote {
  return paymentStatusNotes[status];
}
