import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { submitTicket } from '../utils/api';
import { TicketFormData } from '../utils/validation';

interface UseTicketSubmissionReturn {
  submitForm: (data: TicketFormData) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  ticketId: string | null;
  reset: () => void;
}

export const useTicketSubmission = (): UseTicketSubmissionReturn => {
  const [ticketId, setTicketId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: submitTicket,
    onSuccess: (response) => {
      setTicketId(response.id);
      toast.success(
        `Ticket submitted successfully! Your ticket ID is: ${response.id}`,
        {
          duration: 6000,
          position: 'top-center',
          style: {
            background: '#10b981',
            color: 'white',
            fontWeight: 'bold',
          },
        }
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'Failed to submit ticket. Please try again.',
        {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#ef4444',
            color: 'white',
            fontWeight: 'bold',
          },
        }
      );
    },
  });

  const submitForm = (data: TicketFormData) => {
    const ticketData = {
      ...data,
      category: data.category as any,
      priority: data.priority as any,
    };
    mutation.mutate(ticketData);
  };

  const reset = () => {
    mutation.reset();
    setTicketId(null);
  };

  return {
    submitForm,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error?.message || null,
    ticketId,
    reset,
  };
}; 