import React from 'react';
import { useForm } from 'react-hook-form';
import { motion, type Variants } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/shared/ui/FormInput';
import { BrandIcon, LoginIcon } from '@/shared/lib/SvgLib';
import Button from '@/shared/ui/Button';
import Sponsor from '@/shared/ui/Sponsor';
import { Link } from 'react-router';
import { useLogin } from '../hooks/useLogin';
import type { TenantInfo } from '@/shared/hooks/useTenantCheck';

const loginSchema = z.object({
  user: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});
type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  tenant?: TenantInfo;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
};

const LoginForm: React.FC<LoginFormProps> = ({ tenant }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { user: "", password: "" },
  });

  const mutation = useLogin();

  const onSubmit = (values: LoginFormValues) => {
    mutation.mutate(values);
  };

  const schoolName = tenant?.school_name ?? 'My School';

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto">
      <motion.div variants={itemVariants} className="rounded-2xl bg-bg-main p-6 md:p-8 card-shadow">
        <motion.div variants={itemVariants} className="mx-auto flex-center flex-col gap-3 md:gap-4 mb-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary rounded-2xl md:rounded-3xl flex justify-center items-center shadow-lg overflow-hidden"
          >
            {tenant?.logo ? (
              <img src={tenant.logo} alt={`${schoolName} logo`} className="w-full h-full object-cover" />
            ) : (
              <BrandIcon className="text-bg-main w-8 h-8 md:w-10 md:h-10" />
            )}
          </motion.div>
          <h1 className="text-center text-2xl md:text-3xl font-black text-text-primary tracking-wide font-jakarta">
            {schoolName}
          </h1>
        </motion.div>

        <motion.p variants={itemVariants} className="mb-8 md:mb-10 text-center text-text-muted text-sm md:text-base font-medium">
          Sign in to access your dashboard
        </motion.p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <motion.div variants={itemVariants}>
            <FormInput
              label="Username"
              placeholder="Enter username"
              error={errors.user?.message}
              isLoading={mutation.isPending}
              {...register('user')}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter password"
              error={errors.password?.message}
              isLoading={mutation.isPending}
              {...register('password')}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="text-right">
            <a href="/forgot-password" className="text-xs md:text-sm text-brand-primary hover:underline font-normal font-jakarta transition-colors">
              Forgot Password?
            </a>
          </motion.div>

          {mutation.isError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg bg-red-50 p-2 md:p-3 text-xs md:text-sm text-red-700 border border-red-200"
            >
              {(mutation.error as Error)?.message || 'An unexpected error occurred'}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              leftIcon={<LoginIcon className="text-bg-main w-4 h-4" />}
              className="w-full rounded-2xl text-sm md:text-[13px] font-jakarta font-semibold py-3 md:py-4"
              size="lg"
              isLoading={mutation.isPending}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </motion.div>
        </form>

        <motion.p variants={itemVariants} className="text-body text-xs md:text-sm text-center mt-4 md:mt-6">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-brand-primary hover:underline font-normal transition-colors">
            Signup
          </Link>
        </motion.p>

        <motion.div variants={itemVariants}>
          <Sponsor />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;