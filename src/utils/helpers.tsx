import {
  ExternalToast, toast 
} from 'sonner';
import { ReactNode } from 'react';

// ================================================

type Message = string | ReactNode | object;
type SimpleMessage = string | ReactNode;

export function showToast({ type, status = -1, message, options }: { type?: string; status?: number; message: Message; options?: ExternalToast }) {
  if (type) {
    switch (type) {
      case 'SUCCESS':
        return toast.success(message as SimpleMessage, options);
      case 'INFO':
        return toast.info(message as SimpleMessage, options);
      case 'WARNING':
        return toast.warning(message as SimpleMessage, options);
      case 'ERROR':
        return toast.error(message as SimpleMessage, options);
      case 'OBJECT':
        return toast.info(<code style={{ whiteSpace: 'pre' }}>{JSON.stringify(message, null, 2)}</code>, options);
      default:
        return toast.info('Toast: Unexpected type received.', options);
    }
  } else {
    switch (true) {
      case status >= 200 && status < 300:
        return toast.success(message as SimpleMessage, options);
      case status >= 300 && status < 400:
        return toast.info(message as SimpleMessage, options);
      case status >= 400 && status < 500:
        return toast.warning(message as SimpleMessage, options);
      case status >= 500:
        return toast.error(message as SimpleMessage, options);
      default:
        return toast.info('Unexpected status received.', options);
    }
  }
}
