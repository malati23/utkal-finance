import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/validators';
import { LogIn, Lock, Mail, ArrowRight } from 'lucide-react';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors((prev) => ({ ...prev, [name]: null, form: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setErrors({ form: err.message || 'Invalid credentials. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back</h2>
        <p className="text-xs text-slate-500">Log in to manage your loan requests & user account.</p>
      </div>

      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          icon={Mail}
          placeholder="you@domain.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <div className="flex justify-between items-center text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
            <input type="checkbox" className="rounded text-blue-600" />
            <span>Remember me</span>
          </label>
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            Forgot Password?
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={loading}
          icon={LogIn}
          iconPosition="right"
        >
          Sign In
        </Button>
      </form>

      <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
        Don't have an account yet?{' '}
        <Link to="/register" className="text-blue-600 font-bold hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}
