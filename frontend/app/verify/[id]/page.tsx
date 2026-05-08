'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/axiosInstance';
import { useNotification } from '@/context/notification-context';
import {
	ShoppingBag,
	MailCheck,
	XCircle,
	Loader2,
	ArrowRight,
	RefreshCw,
	Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Status = 'loading' | 'success' | 'error';

const VerifyPage = () => {
	const { error, success } = useNotification();
	const { id } = useParams();
	const router = useRouter();
	const [status, setStatus] = useState<Status>('loading');
	const [message, setMessage] = useState('');

	useEffect(() => {
		const verifyToken = async () => {
			try {
				const res = await api.get(`/auth/verify/${id}`);
				const msg = res.data.message || 'Email successfully verify ho gaya!';
				setMessage(msg);
				setStatus('success');
				success(msg, { title: 'Verified ✓' });
			} catch (err: any) {
				const msg =
					err?.response?.data?.message ||
					'Verification fail ho gaya. Link expire ho gaya hoga.';
				setMessage(msg);
				setStatus('error');
				error(msg, { title: 'Verification Failed' });
			}
		};

		verifyToken();
	}, []);

	// ── Shared card wrapper ──────────────────────────────────────────────────
	const Card = ({ children }: { children: React.ReactNode }) => (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-12">
			{/* Decorative blobs */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 overflow-hidden"
			>
				<div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-100/60 blur-3xl" />
				<div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-100/60 blur-3xl" />
			</div>

			{/* Logo */}
			<Link
				href="/"
				className="relative flex items-center gap-2 mb-10 group"
			>
				<div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-200 group-hover:shadow-rose-300 transition-shadow">
					<ShoppingBag
						className="w-5 h-5 text-white"
						strokeWidth={2.5}
					/>
				</div>
				<span className="font-extrabold text-2xl tracking-tight text-gray-900">
					Luxe<span className="text-rose-500">Mart</span>
				</span>
			</Link>

			{/* Main card */}
			<div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
				{/* Top accent bar */}
				<div className="h-1 w-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400" />
				<div className="p-8 sm:p-10">{children}</div>
			</div>
		</div>
	);

	// ── Loading ──────────────────────────────────────────────────────────────
	if (status === 'loading') {
		return (
			<Card>
				<div className="flex flex-col items-center text-center gap-6">
					{/* Animated icon */}
					<div className="relative">
						<div className="w-20 h-20 rounded-full bg-violet-50 flex items-center justify-center">
							<Loader2 className="w-9 h-9 text-violet-500 animate-spin" />
						</div>
						<span
							aria-hidden
							className="absolute inset-0 rounded-full border-2 border-violet-200 animate-ping opacity-40"
						/>
					</div>

					<div className="space-y-1.5">
						<h1 className="text-2xl font-bold text-gray-900">
							Verify ho raha hai…
						</h1>
						<p className="text-gray-500 text-sm leading-relaxed">
							Aapka email verify kiya ja raha hai.
							<br />
							Thodi der intezaar karein.
						</p>
					</div>

					{/* Animated progress dots */}
					<div className="flex items-center gap-1.5 mt-1">
						{[0, 1, 2].map((i) => (
							<span
								key={i}
								className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
								style={{ animationDelay: `${i * 0.15}s` }}
							/>
						))}
					</div>
				</div>
			</Card>
		);
	}

	// ── Success ──────────────────────────────────────────────────────────────
	if (status === 'success') {
		return (
			<Card>
				<div className="flex flex-col items-center text-center gap-6">
					{/* Success icon */}
					<div className="relative">
						<div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
							<MailCheck className="w-9 h-9 text-emerald-500" />
						</div>
						{/* Checkmark ring */}
						<div className="absolute inset-0 rounded-full border-2 border-emerald-200" />
						{/* Sparkle dots */}
						{[0, 72, 144, 216, 288].map((deg, i) => (
							<span
								key={i}
								aria-hidden
								className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
								style={{
									top: `${50 - 52 * Math.cos((deg * Math.PI) / 180)}%`,
									left: `${50 + 52 * Math.sin((deg * Math.PI) / 180)}%`,
									transform: 'translate(-50%,-50%)',
									opacity: 0.7,
								}}
							/>
						))}
					</div>

					<div className="space-y-2">
						<span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 tracking-wide uppercase">
							Verified ✓
						</span>
						<h1 className="text-2xl font-bold text-gray-900 mt-2">
							Email Verify Ho Gaya!
						</h1>
						<p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
							{message}
						</p>
					</div>

					{/* Divider */}
					<div className="w-full border-t border-gray-100" />

					{/* CTA buttons */}
					<div className="flex flex-col sm:flex-row gap-3 w-full">
						<Button
							className="flex-1 h-11 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-md shadow-rose-100 gap-2"
							onClick={() => router.push('/signin')}
						>
							Login Karein
							<ArrowRight className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							className="flex-1 h-11 rounded-xl gap-2"
							asChild
						>
							<Link href="/">
								<Home className="w-4 h-4" />
								Home
							</Link>
						</Button>
					</div>

					<p className="text-xs text-gray-400">
						Aapka account ab poora active hai. Shopping shuru karein! 🛍️
					</p>
				</div>
			</Card>
		);
	}

	// ── Error ────────────────────────────────────────────────────────────────
	return (
		<Card>
			<div className="flex flex-col items-center text-center gap-6">
				{/* Error icon */}
				<div className="relative">
					<div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
						<XCircle className="w-9 h-9 text-red-500" />
					</div>
					<div className="absolute inset-0 rounded-full border-2 border-red-100" />
				</div>

				<div className="space-y-2">
					<span className="inline-block text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-full px-3 py-1 tracking-wide uppercase">
						Failed
					</span>
					<h1 className="text-2xl font-bold text-gray-900 mt-2">
						Verification Fail Ho Gaya
					</h1>
					<p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
						{message}
					</p>
				</div>

				{/* Common causes */}
				<div className="w-full bg-red-50/60 border border-red-100 rounded-2xl p-4 text-left space-y-2">
					<p className="text-xs font-semibold text-red-700 uppercase tracking-wide">
						Possible Reasons
					</p>
					{[
						'Link expire ho gaya (24 ghante valid hota hai)',
						'Link pehle hi use ho chuka hai',
						'Link sahi copy nahi hua',
					].map((reason) => (
						<div key={reason} className="flex items-start gap-2">
							<span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
							<p className="text-xs text-red-600">{reason}</p>
						</div>
					))}
				</div>

				{/* Divider */}
				<div className="w-full border-t border-gray-100" />

				{/* CTA */}
				<div className="flex flex-col sm:flex-row gap-3 w-full">
					<Button
						className="flex-1 h-11 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-md shadow-rose-100 gap-2"
						onClick={() => router.push('/signup')}
					>
						<RefreshCw className="w-4 h-4" />
						Dobara Sign Up Karein
					</Button>
					<Button
						variant="outline"
						className="flex-1 h-11 rounded-xl gap-2"
						asChild
					>
						<Link href="/">
							<Home className="w-4 h-4" />
							Home
						</Link>
					</Button>
				</div>

				<p className="text-xs text-gray-400">
					Madad chahiye?{' '}
					<Link
						href="/contact"
						className="text-rose-500 hover:underline underline-offset-2"
					>
						Support se rabta karein
					</Link>
				</p>
			</div>
		</Card>
	);
};

export default VerifyPage;