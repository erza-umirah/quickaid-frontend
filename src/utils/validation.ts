import { z } from 'zod';

export const ticketSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  category: z
    .string()
    .min(1, 'Please select a category'),
  
  priority: z
    .string()
    .min(1, 'Please select a priority level'),
  
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
});

export type TicketFormData = z.infer<typeof ticketSchema>;

export const validateField = (field: keyof TicketFormData, value: string) => {
  try {
    const fieldSchema = ticketSchema.shape[field];
    fieldSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return 'Invalid input';
  }
};

export const validateForm = (data: Partial<TicketFormData>) => {
  try {
    ticketSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
}; 