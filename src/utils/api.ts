import axios from 'axios';
import { TicketFormData, TicketResponse } from '../types/ticket.types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for loading states
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const submitTicket = async (ticketData: TicketFormData): Promise<TicketResponse> => {
  try {
    const response = await api.post('/submit_ticket', {
      email: ticketData.email,
      fullName: ticketData.fullName,
      title: ticketData.title,
      category: ticketData.category,
      priority: ticketData.priority,
      description: ticketData.description,
      timestamp: new Date().toISOString(),
    });

    return {
      id: response.data.id || `TK-${Date.now()}`,
      status: 'success',
      message: 'Ticket submitted successfully',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to submit ticket');
  }
};

export const getTickets = async (): Promise<any[]> => {
  try {
    const response = await api.get('/get_tickets');
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch tickets');
  }
};

export default api; 