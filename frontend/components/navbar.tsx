'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	ShoppingBag,
	Search,
	Heart,
	Menu,
	X,
	ChevronDown,
	Sparkles,
	User,
	LogOut,
	Settings,
	Package,
	Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useDataContext } from '@/context/data-context';
import { useRouter } from 'next/navigation';

const NAV_LINKS = [
	{
		label: 'New Arrivals',
		href: '/new-arrivals',
		badge: 'Hot',
	},
	{
		label: 'Collections',
		href: '/collections',
		children: [
			{ label: 'Men', href: '/collections/men' },
			{ label: 'Women', href: '/collections/women' },
			{ label: 'Kids', href: '/collections/kids' },
			{ label: 'Accessories', href: '/collections/accessories' },
		],
	},
	{ label: 'Sale', href: '/sale', badge: '50% Off' },
	{ label: 'Brands', href: '/brands' },
	{ label: 'About', href: '/about' },
];

// Mock auth state — replace with your actual auth logic (NextAuth, Clerk, etc.)
interface User {
	name: string;
	email: string;
	avatar?: string;
	initials: string;
}

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	// const [user, setUser] = useState<User | null>(null); // null = logged out
	const { activeUser: user, updateActiveUser } = useDataContext(); // Access activeUser from context
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// avatar 'AB' two words name
	const getInitials = (name: string) => {
		const names = name.split(' ');
		const initials = names.map((n) => n[0]).join('');
		return initials.toUpperCase();
	};

	const handleLogout = () => {
		window.localStorage.removeItem('user'); // Clear user from localStorage
		document.cookie =
			'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear token cookie
		updateActiveUser(null); // Clear active user in context
    router.push('/signin'); // Redirect to sign-in page after logout
	};

	return (
		<>
			{/* Announcement Bar */}
			<div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white text-center text-xs py-2 px-4 font-medium tracking-wide">
				<span className="flex items-center justify-center gap-2">
					<Sparkles className="w-3 h-3" />
					Muft Delivery – PKR 2,000 se upar sab orders par
					&nbsp;|&nbsp; Code:
					<span className="font-bold underline underline-offset-2">
						SAVE20
					</span>
					<Sparkles className="w-3 h-3" />
				</span>
			</div>

			{/* Main Navbar */}
			<header
				className={cn(
					'sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm transition-all duration-300',
					isScrolled
						? 'border-gray-200 shadow-sm'
						: 'border-transparent',
				)}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 gap-4">
						{/* ── Logo ── */}
						<Link
							href="/"
							className="flex items-center gap-2 shrink-0 group"
							aria-label="LuxeMart Home"
						>
							<div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md group-hover:shadow-pink-300 transition-shadow duration-300">
								<ShoppingBag
									className="w-4 h-4 text-white"
									strokeWidth={2.5}
								/>
							</div>
							<span className="font-extrabold text-xl tracking-tight text-gray-900 hidden sm:block">
								Luxe<span className="text-rose-500">Mart</span>
							</span>
						</Link>

						{/* ── Desktop Nav Links ── */}
						<nav
							className="hidden lg:flex items-center gap-1"
							aria-label="Primary navigation"
						>
							{NAV_LINKS.map((link) =>
								link.children ? (
									<DropdownMenu key={link.label}>
										<DropdownMenuTrigger asChild>
											<button
												className={cn(
													'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
													'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
												)}
											>
												{link.label}
												<ChevronDown className="w-3.5 h-3.5 opacity-60" />
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="start"
											className="w-44"
										>
											{link.children.map((child) => (
												<DropdownMenuItem
													key={child.href}
													asChild
												>
													<Link href={child.href}>
														{child.label}
													</Link>
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								) : (
									<Link
										key={link.label}
										href={link.href}
										className={cn(
											'relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
											pathname === link.href
												? 'text-rose-600 bg-rose-50'
												: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
										)}
									>
										{link.label}
										{link.badge && (
											<span className="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full leading-none">
												{link.badge}
											</span>
										)}
									</Link>
								),
							)}
						</nav>

						{/* ── Search Bar (Desktop) ── */}
						<div className="hidden md:flex flex-1 max-w-sm">
							<div className="relative w-full">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<Input
									type="search"
									placeholder="Kuch bhi dhoondein..."
									className="pl-9 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:ring-rose-500 focus:border-rose-400 rounded-xl text-sm"
								/>
							</div>
						</div>

						{/* ── Right Actions ── */}
						<div className="flex items-center gap-1">
							{/* Search Icon (Mobile) */}
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden rounded-xl text-gray-600 hover:text-gray-900"
								onClick={() => setSearchOpen(!searchOpen)}
								aria-label="Search"
							>
								<Search className="w-5 h-5" />
							</Button>

							{/* Wishlist */}
							<Button
								variant="ghost"
								size="icon"
								className="relative rounded-xl text-gray-600 hover:text-gray-900"
								asChild
							>
								<Link href="/wishlist" aria-label="Wishlist">
									<Heart className="w-5 h-5" />
									<Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-rose-500 hover:bg-rose-500">
										3
									</Badge>
								</Link>
							</Button>

							{/* Cart */}
							<Button
								variant="ghost"
								size="icon"
								className="relative rounded-xl text-gray-600 hover:text-gray-900"
								asChild
							>
								<Link href="/cart" aria-label="Shopping Cart">
									<ShoppingBag className="w-5 h-5" />
									<Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-rose-500 hover:bg-rose-500">
										2
									</Badge>
								</Link>
							</Button>

							{/* ── Auth Section ── */}
							{user ? (
								/* Logged-in user dropdown */
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button
											className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 transition-colors ml-1"
											aria-label="User menu"
										>
											<Avatar className="w-8 h-8 ring-2 ring-rose-200">
												<AvatarImage
													// src={user.avatar}
													alt={user.name}
												/>
												<AvatarFallback className="bg-gradient-to-br from-rose-400 to-pink-500 text-white text-xs font-bold">
													{getInitials(user.name)}
												</AvatarFallback>
											</Avatar>
											<span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[80px] truncate">
												{user.name.split(' ')[0]}
											</span>
											<ChevronDown className="hidden sm:block w-3.5 h-3.5 text-gray-400" />
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="w-56"
									>
										<DropdownMenuLabel>
											<p className="font-semibold text-sm text-gray-900">
												{user.name}
											</p>
											<p className="text-xs text-gray-500 font-normal mt-0.5">
												{user.email}
											</p>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem asChild>
												<Link
													href="/profile"
													className="cursor-pointer"
												>
													<User className="mr-2 h-4 w-4" />
													Mera Profile
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href="/orders"
													className="cursor-pointer"
												>
													<Package className="mr-2 h-4 w-4" />
													Meri Orders
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href="/notifications"
													className="cursor-pointer"
												>
													<Bell className="mr-2 h-4 w-4" />
													Notifications
													<Badge className="ml-auto text-[10px] h-4 px-1.5 bg-rose-500 hover:bg-rose-500">
														5
													</Badge>
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href="/settings"
													className="cursor-pointer"
												>
													<Settings className="mr-2 h-4 w-4" />
													Settings
												</Link>
											</DropdownMenuItem>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={handleLogout}
											className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
										>
											<LogOut className="mr-2 h-4 w-4" />
											Logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								/* Logged-out buttons */
								<div className="hidden sm:flex items-center gap-2 ml-1">
									<Button
										variant="ghost"
										size="sm"
										className="text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl"
										// onClick={handleLogin}
										asChild
									>
										<Link href="/signin">Sign In</Link>
									</Button>
									<Button
										size="sm"
										className="text-sm font-medium bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-sm shadow-rose-200"
										asChild
									>
										<Link href="/signup">Sign Up</Link>
									</Button>
								</div>
							)}

							{/* ── Mobile Hamburger ── */}
							<Sheet
								open={mobileOpen}
								onOpenChange={setMobileOpen}
							>
								<SheetTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="lg:hidden rounded-xl text-gray-600 hover:text-gray-900 ml-1"
										aria-label="Open menu"
									>
										<Menu className="w-5 h-5" />
									</Button>
								</SheetTrigger>
								<SheetContent side="right" className="w-80 p-0">
									<SheetHeader className="px-6 py-4 border-b">
										<SheetTitle className="flex items-center gap-2">
											<div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
												<ShoppingBag
													className="w-3.5 h-3.5 text-white"
													strokeWidth={2.5}
												/>
											</div>
											<span className="font-extrabold text-lg">
												Luxe
												<span className="text-rose-500">
													Mart
												</span>
											</span>
										</SheetTitle>
									</SheetHeader>

									<div className="px-4 py-4 border-b">
										<div className="relative">
											<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
											<Input
												type="search"
												placeholder="Kuch bhi dhoondein..."
												className="pl-9 rounded-xl"
											/>
										</div>
									</div>

									<nav className="px-4 py-4 space-y-1">
										{NAV_LINKS.map((link) =>
											link.children ? (
												<div key={link.label}>
													<p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
														{link.label}
													</p>
													{link.children.map(
														(child) => (
															<Link
																key={child.href}
																href={
																	child.href
																}
																onClick={() =>
																	setMobileOpen(
																		false,
																	)
																}
																className="block px-6 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
															>
																{child.label}
															</Link>
														),
													)}
												</div>
											) : (
												<Link
													key={link.label}
													href={link.href}
													onClick={() =>
														setMobileOpen(false)
													}
													className={cn(
														'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
														pathname === link.href
															? 'bg-rose-50 text-rose-600'
															: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
													)}
												>
													{link.label}
													{link.badge && (
														<span className="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
															{link.badge}
														</span>
													)}
												</Link>
											),
										)}
									</nav>

									<div className="px-4 py-4 border-t mt-auto">
										{user ? (
											<div className="space-y-2">
												<div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-xl">
													<Avatar className="w-10 h-10 ring-2 ring-rose-200">
														<AvatarImage
															// src={user.avatar}
															alt={user.name}
														/>
														<AvatarFallback className="bg-gradient-to-br from-rose-400 to-pink-500 text-white text-sm font-bold">
															{user.initials}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="text-sm font-semibold text-gray-900">
															{user.name}
														</p>
														<p className="text-xs text-gray-500">
															{user.email}
														</p>
													</div>
												</div>
												<Button
													variant="outline"
													className="w-full rounded-xl text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
													onClick={() => {
														handleLogout();
														setMobileOpen(false);
													}}
												>
													<LogOut className="mr-2 h-4 w-4" />
													Logout
												</Button>
											</div>
										) : (
											<div className="space-y-2">
												<Button
													variant="outline"
													className="w-full rounded-xl"
													asChild
												>
													<Link
														href="/signin"
														onClick={() =>
															setMobileOpen(false)
														}
													>
														Sign In
													</Link>
												</Button>
												<Button
													className="w-full rounded-xl bg-rose-500 hover:bg-rose-600 text-white"
													asChild
												>
													<Link
														href="/signup"
														onClick={() =>
															setMobileOpen(false)
														}
													>
														Sign Up
													</Link>
												</Button>
											</div>
										)}
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>

				{/* Mobile Search Bar (toggled) */}
				{searchOpen && (
					<div className="md:hidden border-t bg-white px-4 py-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								type="search"
								placeholder="Kuch bhi dhoondein..."
								className="pl-9 pr-10 rounded-xl w-full"
								autoFocus
							/>
							<button
								onClick={() => setSearchOpen(false)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}
			</header>
		</>
	);
}
