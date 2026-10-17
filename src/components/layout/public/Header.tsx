"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LayoutDashboard, LogOut, Menu, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetMe, useLogoutUser } from "@/hooks/auth.hook";

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: userResponse, isLoading } = useGetMe();
  const { mutate: logoutUser } = useLogoutUser();
  const queryClient = useQueryClient();

  const user = userResponse?.data;

  function handleLogout() {
    logoutUser(undefined, {
      onSuccess: function () {
        toast.success("Logged out successfully");
        setIsProfileOpen(false);
        setIsMenuOpen(false);
        queryClient.clear();
        queryClient.invalidateQueries({ queryKey: ["service-requests"] });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: function (error: any) {
        toast.error(error?.message || "Failed to log out");
      },
    });
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Public Requests", href: "/public-requests" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  function getDashboardPath() {
    if (!user) return "/login";
    if (user?.role === "CITIZEN") return "/citizen-dashboard";
    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN")
      return "/admin-dashboard";
    if (user?.role === "STAFF") return "/staff-dashboard";
    return "/login";
  }

  return (
    <header className="sticky  top-0 z-50 w-full border-b border-white/20 bg-background/40 backdrop-blur-md backdrop-saturate-200 shadow-sm transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Image
            src="/logo.jpg"
            alt="City Service Portal"
            width={38}
            height={38}
            className="rounded-md object-cover shadow-xs"
          />
          <span className="text-primary  font-extrabold hidden sm:inline-block tracking-tight">
            City Service
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(function (link) {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-green-600 transition-colors"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop User Profile / Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="w-9 h-9 rounded-full bg-muted/60 animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={function () {
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none transition-colors"
              >
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover border border-white/30 shadow-xs"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center font-bold text-sm border border-green-500/20">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Glassy Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/20 bg-background/80 backdrop-blur-xl p-2 shadow-xl z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-2 border-b border-border/50 mb-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-600 pb-1">
                      <User className="size-4" /> <span>{user.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate pb-1">
                      {user.email}
                    </p>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-orange-600 bg-orange-500/10 rounded-full uppercase">
                      {user.role}
                    </span>
                  </div>

                  <Link
                    href={getDashboardPath()}
                    onClick={function () {
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 text-red-600 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-foreground focus:outline-none"
          onClick={function () {
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu with Glass Effect */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-white/20 bg-background/90 backdrop-blur-xl px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          {user && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50 mb-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <User className="size-4" /> <span>{user.name}</span>
                </div>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
                <span className="text-[10px] font-bold text-orange-500 uppercase mt-0.5">
                  {user.role}
                </span>
              </div>
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center font-bold text-base border border-green-500/20">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}

          {navLinks.map(function (link) {
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={function () {
                  setIsMenuOpen(false);
                }}
                className="block text-sm font-medium py-2 px-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-border/50 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href={getDashboardPath()}
                  onClick={function () {
                    setIsMenuOpen(false);
                  }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LayoutDashboard className="size-4" /> Dashboard
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="size-4" /> Logout
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link href="/login" onClick={function () { setIsMenuOpen(false); }}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={function () { setIsMenuOpen(false); }}>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}