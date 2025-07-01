"use client"; // This component needs to be a client component for hooks

import React from 'react';
import { useForm } from 'react-hook-form';
import type { AppDispatch } from "@/store";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Import your custom form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Adjust path as per your project structure

// Assuming you have these Shadcn UI components available:
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createComment } from '@/store/slices/commentSlice';

// Define the form schema using Zod for validation
const commentFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }).max(50, { message: "First name cannot exceed 50 characters." }),
  lastName: z.string().min(1, { message: "Last name is required." }).max(50, { message: "Last name cannot exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }).min(1, { message: "Email is required." }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }).max(500, { message: "Comment cannot exceed 500 characters." }),
});

// Infer the type from the schema for type safety
type CommentFormValues = z.infer<typeof commentFormSchema>;

const CommentSection: React.FC = () => {
  // Initialize react-hook-form with the zod resolver and default values
  const { toast } = useToast();
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      comment: '',
    },
    mode: "onBlur", // Validate on blur for better user experience
  });

  const dispatch = useDispatch<AppDispatch>();

  // Handle form submission
  const onSubmit = async (values: CommentFormValues) => {
    const commentData = {
      id: Date.now(), // Temporary unique id, replace as needed
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      content: values.comment,
      createdAt: new Date(),
      postId: 1, 
    };

    try {
      await dispatch(createComment(commentData)).then(() => {
        toast({
          title: "Comment submitted",
          description: "Your comment has been submitted successfully.",
          duration: 4000,
        });
      });
      form.reset(); // Reset form fields after successful submission
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your comment. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Leave a Comment</h2>

      <Form {...form}>
        {/* Use form.handleSubmit to manage the submission process, including validation */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    {/* Input component automatically receives props from field */}
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comment Textarea */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Comment</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your comment here..." rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full md:w-auto">
            Submit Comment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CommentSection;
