'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import api from '@/utils/axiosInstance';
import { useNotification } from '@/context/notification-context';
import { useDataContext } from '@/context/data-context';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { updateActiveUser } = useDataContext();
	const { success, error } = useNotification();
	const [showPass, setShowPass] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { email, password } = form;
			const res = await api.post('/auth/login', { email, password });

      localStorage.setItem('user', JSON.stringify(res.data.user));

      document.cookie = `token=${res.data.token}; path=/`;
      updateActiveUser(res.data.user); // Update active user in context
			success('Login successful! Welcome back.');
			setForm({ email: '', password: '' });
			router.push('/'); // Redirect to home page after successful login
		} catch (err: Error | any) {
			console.error('Login error:', err.response.data.message); // Log the full error response for debugging
			// use notification context to show error message
			error(
				err.response.data.message ||
					'Something went wrong. Please try again.',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<Link
						href="/"
						className="inline-flex items-center gap-2 mb-6"
					>
						<div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
							<ShoppingBag
								className="w-5 h-5 text-white"
								strokeWidth={2.5}
							/>
						</div>
						<span className="font-extrabold text-2xl">
							Luxe<span className="text-rose-500">Mart</span>
						</span>
					</Link>
					<h1 className="text-2xl font-bold text-gray-900">
						Wapas Aaiye!
					</h1>
					<p className="text-gray-500 mt-1 text-sm">
						Apne account mein login karein
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-8">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								placeholder="aap@example.com"
								value={form.email}
								onChange={(e) =>
									setForm({ ...form, email: e.target.value })
								}
								className="rounded-xl h-11"
								required
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<Link
									href="/forgot-password"
									className="text-xs text-rose-600 hover:underline"
								>
									Password bhool gaye?
								</Link>
							</div>
							<div className="relative">
								<Input
									id="password"
									type={showPass ? 'text' : 'password'}
									placeholder="••••••••"
									value={form.password}
									onChange={(e) =>
										setForm({
											...form,
											password: e.target.value,
										})
									}
									className="rounded-xl h-11 pr-10"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPass(!showPass)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showPass ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							</div>
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="w-full h-11 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-md shadow-rose-100"
						>
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Login ho raha hai...
								</>
							) : (
								'Login Karein'
							)}
						</Button>
					</form>

					<div className="mt-6">
						<Separator className="my-4" />
						<p className="text-center text-sm text-gray-500">
							Account nahi hai?{' '}
							<Link
								href="/signup"
								className="text-rose-600 font-semibold hover:underline"
							>
								Sign Up Karein
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
