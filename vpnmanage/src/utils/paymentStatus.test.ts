import { strictEqual } from 'node:assert/strict';
import { getPaymentStatusNote, normalizePaymentStatus, type PaymentStatus } from './paymentStatus';

type AlertType = 'success' | 'warning' | 'error';

const expectedNotes: Array<{
  status: PaymentStatus;
  title: string;
  message: string;
  alertType: AlertType;
}> = [
  {
    status: 'configured',
    title: 'Payment configured',
    message: 'Payment is configured for this subscription.',
    alertType: 'success',
  },
  {
    status: 'pending',
    title: 'Payment pending',
    message: 'No active subscription payment is recorded for this account.',
    alertType: 'warning',
  },
  {
    status: 'unavailable',
    title: 'Payment unavailable',
    message: 'Payment status is unavailable right now.',
    alertType: 'error',
  },
];

for (const status of ['configured', 'pending', 'unavailable'] as const) {
  strictEqual(normalizePaymentStatus(status), status);
}

for (const status of [undefined, null, '', 'unknown', 'CONFIGURED', 0]) {
  strictEqual(normalizePaymentStatus(status), 'unavailable');
}

for (const expectedNote of expectedNotes) {
  const note = getPaymentStatusNote(expectedNote.status);

  strictEqual(note.status, expectedNote.status);
  strictEqual(note.title, expectedNote.title);
  strictEqual(note.message, expectedNote.message);
  strictEqual(note.alertType, expectedNote.alertType);
}
