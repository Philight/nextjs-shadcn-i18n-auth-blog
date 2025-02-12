import {
  object, string 
} from 'zod';

export const createPostSchema = object({
  title: string({ required_error: 'Title is required' }).min(3, 'Title has to have a minimum of 3 chars'),
  content: string({ required_error: 'Content is required' }).min(10, 'Content has to have a minimum of 10 characters'),
});

export const signInSchema = object({
  email: string({ required_error: 'Email is required' }).min(1, 'Email is required').email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
});

export const signUpSchema = object({
  email: string({ required_error: 'Email is required' }).min(1, 'Email is required').email('Invalid email'),
  firstname: string({ required_error: 'First Name is required' }).min(3, 'First Name has to have a minimum of 3 chars'),
  lastname: string({ required_error: 'Last Name is required' }).min(3, 'Last Name has to have a minimum of 3 chars'),
  password: string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
  password_confirm: string({ required_error: 'Password is required' }).min(8, 'Password must be more than 8 characters'),
}).refine((data) => data.password === data.password_confirm, {
  message: "Passwords don't match",
  path: ['password_confirm'],
});
