import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import FormInput from '@/shared/ui/FormInput';
import { BrandIcon, LoginIcon } from '@/shared/lib/SvgLib';
import Button from '@/shared/ui/Button';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

// Replace with your actual API call
const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  return response.json();
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login success:', data);
      // handle success (store token, redirect, etc.)
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 font-lato">

      <div className="w-full max-w-md rounded-2xl bg-bg-main p-8 card-shadow">

        <div className='mx-auto flex-center flex-col gap-4 mb-3'>
            <div className='w-20 h-20 bg-brand-primary rounded-3xl flex justify-center items-center'>
                <BrandIcon className='text-bg-main'/>
            </div>
            <h1 className="text-center text-3xl font-black text-text-title tracking-wide">
                My School
            </h1>
        </div>
        
        <p className="mb-10 text-center text-text-muted text-base font-medium">
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Username"
            placeholder="Enter username"
            error={errors.username?.message}
            isLoading={mutation.isPending}
            {...register('username', { required: 'Username is required' })}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Enter password"
            error={errors.password?.message}
            isLoading={mutation.isPending}
            {...register('password', { required: 'Password is required' })}
          />

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-brand-primary hover:underline font-normal font-jakarta"
            >
              Forgot Password?
            </a>
          </div>

          {/* Show API/mutation error */}
          {mutation.isError && (
            <div className="rounded bg-red-50 p-2 text-sm text-red-700 border border-red-200">
              {(mutation.error as Error)?.message || 'An unexpected error occurred'}
            </div>
          )}
          <Button 
            type="submit"
            leftIcon={<LoginIcon className='text-bg-main' />}
            className='w-full rounded-2xl text-[13px] font-jakarta font-semibold py-4'
            size='lg'
            disabled={mutation.isPending}
        >
            {mutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
        </form>

        <p className="text-body text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-brand-primary hover:underline font-normal">
            Log in here
          </a>
        </p>

        <p className="w-38 h-8 flex-center mx-auto rounded-full text-center text-text-muted font-lato font-normal text-xs border border-border-line02 bg-bg-input">
          Powered by Schoolzy
        </p>
      </div>
    </div>
  );
};

export default LoginForm;