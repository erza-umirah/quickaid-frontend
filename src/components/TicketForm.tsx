import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, RefreshCw, User, Mail, FileText, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

import { ticketSchema, TicketFormData } from '../utils/validation';
import { useTicketSubmission } from '../hooks/useTicketSubmission';
import { LoadingSpinner } from './LoadingSpinner';
import { ValidationMessage } from './ValidationMessage';

const categories = [
  'IT Support',
  'Network Issues',
  'Software Issues', 
  'Hardware Issues',
  'Facility Management',
  'Academic Support',
  'Other'
];

const priorities = [
  { value: 'Low', color: 'text-green-600', bg: 'bg-green-50' },
  { value: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { value: 'High', color: 'text-orange-600', bg: 'bg-orange-50' },
  { value: 'Urgent', color: 'text-red-600', bg: 'bg-red-50' }
];

export const TicketForm: React.FC = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const { submitForm, isLoading, isSuccess, ticketId, reset } = useTicketSubmission();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset: resetForm,
    watch
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    mode: 'onChange'
  });

  const description = watch('description', '');
  
  React.useEffect(() => {
    setCharacterCount(description?.length || 0);
  }, [description]);

  const onSubmit = (data: TicketFormData) => {
    submitForm(data);
  };

  const handleReset = () => {
    resetForm();
    reset();
    setCharacterCount(0);
  };

  if (isSuccess && ticketId) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your ticket has been successfully submitted and assigned ID:
          </p>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <p className="text-primary-800 font-mono text-lg font-bold">{ticketId}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            You will receive an email confirmation shortly. Our support team will review your ticket and respond within 24 hours.
          </p>
          <button
            onClick={handleReset}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Submit Another Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">QuickAid Helpdesk</h1>
        <p className="text-gray-600">Submit your support request and we'll get back to you quickly</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Personal Information Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-600" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                {...register('fullName')}
                type="text"
                id="fullName"
                className={clsx(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                  errors.fullName 
                    ? 'border-error-500 bg-error-50' 
                    : touchedFields.fullName && !errors.fullName
                    ? 'border-success-500 bg-success-50'
                    : 'border-gray-300'
                )}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <ValidationMessage type="error" message={errors.fullName.message!} className="mt-2" />
              )}
              {touchedFields.fullName && !errors.fullName && (
                <ValidationMessage type="success" message="Looks good!" className="mt-2" />
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={clsx(
                    'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                    errors.email 
                      ? 'border-error-500 bg-error-50' 
                      : touchedFields.email && !errors.email
                      ? 'border-success-500 bg-success-50'
                      : 'border-gray-300'
                  )}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <ValidationMessage type="error" message={errors.email.message!} className="mt-2" />
              )}
              {touchedFields.email && !errors.email && (
                <ValidationMessage type="success" message="Valid email address" className="mt-2" />
              )}
            </div>
          </div>
        </div>

        {/* Ticket Details Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            Ticket Details
          </h3>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                className={clsx(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                  errors.title 
                    ? 'border-error-500 bg-error-50' 
                    : touchedFields.title && !errors.title
                    ? 'border-success-500 bg-success-50'
                    : 'border-gray-300'
                )}
                placeholder="Brief description of your issue"
              />
              {errors.title && (
                <ValidationMessage type="error" message={errors.title.message!} className="mt-2" />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register('category')}
                  id="category"
                  className={clsx(
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white',
                    errors.category 
                      ? 'border-error-500 bg-error-50' 
                      : touchedFields.category && !errors.category
                      ? 'border-success-500 bg-success-50'
                      : 'border-gray-300'
                  )}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <ValidationMessage type="error" message={errors.category.message!} className="mt-2" />
                )}
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level *
                </label>
                <select
                  {...register('priority')}
                  id="priority"
                  className={clsx(
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white',
                    errors.priority 
                      ? 'border-error-500 bg-error-50' 
                      : touchedFields.priority && !errors.priority
                      ? 'border-success-500 bg-success-50'
                      : 'border-gray-300'
                  )}
                >
                  <option value="">Select priority</option>
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.value}
                    </option>
                  ))}
                </select>
                {errors.priority && (
                  <ValidationMessage type="error" message={errors.priority.message!} className="mt-2" />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={5}
                className={clsx(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-y',
                  errors.description 
                    ? 'border-error-500 bg-error-50' 
                    : touchedFields.description && !errors.description
                    ? 'border-success-500 bg-success-50'
                    : 'border-gray-300'
                )}
                placeholder="Please provide detailed information about your issue, including steps to reproduce the problem, error messages, and any relevant context..."
              />
              <div className="flex justify-between items-center mt-2">
                <div>
                  {errors.description && (
                    <ValidationMessage type="error" message={errors.description.message!} />
                  )}
                </div>
                <span className={clsx(
                  'text-sm',
                  characterCount > 1000 ? 'text-error-600' : 'text-gray-500'
                )}>
                  {characterCount}/1000 characters
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={clsx(
              'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200',
              isValid && !isLoading
                ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-200'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" text="Submitting..." />
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Ticket
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Reset Form
          </button>
        </div>

        {/* Form Progress Indicator */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <AlertTriangle className="w-4 h-4" />
            <span>
              Fields marked with * are required. 
              {Object.keys(touchedFields).length > 0 && (
                <span className="ml-2">
                  Form is {Math.round((Object.keys(touchedFields).length / 6) * 100)}% complete
                </span>
              )}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}; 