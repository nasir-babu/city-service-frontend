import ForgotPasswordForm from "@/components/form/forgot-password-form";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh bg-slate-50/50 dark:bg-slate-950 w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/logo.jpg"
              alt="City Service Portal Logo"
              width={40}
              height={40}
              className="object-contain rounded-lg"
            />
            <span className="text-xl font-bold">City Service</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-md">
            <Suspense fallback={<p className="text-center text-xs text-slate-500">Loading...</p>}>
              <ForgotPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}