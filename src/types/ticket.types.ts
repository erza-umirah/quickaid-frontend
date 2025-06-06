export interface TicketFormData {
  email: string;
  fullName: string;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  attachments?: File[];
}

export interface TicketResponse {
  id: string;
  status: 'success' | 'error';
  message: string;
  timestamp: string;
}

export type TicketCategory = 
  | 'IT Support'
  | 'Facility Management'
  | 'Academic Support'
  | 'Network Issues'
  | 'Software Issues'
  | 'Hardware Issues'
  | 'Other';

export type TicketPriority = 
  | 'Low'
  | 'Medium' 
  | 'High'
  | 'Urgent';

export interface FormErrors {
  email?: string;
  fullName?: string;
  title?: string;
  category?: string;
  priority?: string;
  description?: string;
  attachments?: string;
} 