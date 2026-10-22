"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useResetPassword, useForgotPassword } from "@/hooks/auth.hook";

const RESEND_COOLDOWN = 120;

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Query Params
  const emailFromQuery = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { mutate: resetPassword, isPending } = useResetPassword();
  const { mutate: resendOtp, isPending: isResending } = useForgotPassword();

  //    Forgot Password
  useEffect(() => {
    if (!emailFromQuery) {
      router.push("/forgot-password");
    } else {
      setEmail(emailFromQuery);
    }
  }, [emailFromQuery, router]);

  // Resend Timer Count Down
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResend = () => {
    if (!email) return;
    resendOtp(
      { email },
      {
        onSuccess: () => {
          toast.success("OTP Resent!", {
            description: "A new 8-digit OTP code has been sent to your email.",
          });
          setResendTimer(RESEND_COOLDOWN);
        },
        onError: (err: any) => {
          toast.error("Failed to resend OTP", {
            description: err?.data?.message || "Something went wrong.",
          });
        },
      },
    );
  };

  const handleReset = () => {
    const newErrors: { [key: string]: string } = {};

    if (otp.length !== 8) {
      newErrors.otp = "Please enter a valid 8-digit OTP code.";
    }
    if (!newPassword || newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one number.";
    } else if (!/[@$!%*?&]/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one special character.";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    resetPassword(
      { email, newPassword, otp },
      {
        onSuccess: (res: any) => {
          if (!res?.success) {
            toast.error("Reset Failed", {
              description: res?.message || "Invalid OTP code or request.",
            });
            return;
          }

          toast.success("Password Reset Successful!", {
            description: "You can now log in with your new password.",
          });
          router.push("/login");
        },
        onError: (err: any) => {
          toast.error("Reset Failure", {
            description:
              err?.data?.message || err?.message || "Something went wrong.",
          });
        },
      },
    );
  };

  if (!emailFromQuery) return null;

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter the 8-digit OTP sent to{" "}
          <span className="font-semibold text-foreground">{email}</span> and set
          your new password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="reset-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleReset();
          }}
          className="space-y-4"
        >
          {/* Email (Readonly / Auto-filled) */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="pl-9 bg-slate-100 dark:bg-slate-800 opacity-80 cursor-not-allowed"
              />
              <Mail className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </Field>

          {/* 8-Digit OTP Code Input */}
          <Field data-invalid={!!errors.otp}>
            <FieldLabel htmlFor="otp">8-Digit OTP Code</FieldLabel>
            <InputOTP
              maxLength={8}
              onChange={(value) => {
                setOtp(value);
                if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className="justify-center w-full gap-1">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>

            {errors.otp && <FieldError errors={[{ message: errors.otp }]} />}

            <FieldDescription className="mt-1 text-xs flex items-center justify-between">
              <span>Resend code in {resendTimer}s</span>
              <button
                type="button"
                disabled={resendTimer > 0 || isResending}
                onClick={handleResend}
                className="text-emerald-600 dark:text-emerald-400 font-semibold disabled:opacity-50 hover:underline"
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            </FieldDescription>
          </Field>

          {/* New Password */}
          <Field data-invalid={!!errors.newPassword}>
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Ab@12345"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword)
                    setErrors((prev) => ({ ...prev, newPassword: "" }));
                }}
                className="pl-9 pr-9"
              />
              <Lock className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <FieldError errors={[{ message: errors.newPassword }]} />
            )}
          </Field>

          {/* Confirm Password */}
          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="confirmPassword">
              Confirm New Password
            </FieldLabel>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Ab@12345"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                className="pl-9"
              />
              <ShieldCheck className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.confirmPassword && (
              <FieldError errors={[{ message: errors.confirmPassword }]} />
            )}
          </Field>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-3">
        <Button
          type="submit"
          form="reset-password-form"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spinner /> Resetting Password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
