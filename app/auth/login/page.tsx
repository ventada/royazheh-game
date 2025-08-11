"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import TopBar from "../../components/TopBar";
import {
  IconEye,
  IconEyeOff,
  IconLogin,
  IconUser,
  IconLock,
} from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "نام کاربری یا ایمیل الزامی است";
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (formData.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = "لطفاً تأیید کنید که ربات نیستید";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // TODO: Implement actual login logic
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      // Mock successful login
      router.push("/profile");
    } catch (error) {
      setErrors({ submit: "خطا در ورود. لطفاً دوباره تلاش کنید." });
    } finally {
      setIsLoading(false);
    }
  };

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token && errors.recaptcha) {
      setErrors((prev) => ({ ...prev, recaptcha: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <TopBar title="ورود" showLogo={false} />

      <div className="px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--accent-gold)] rounded-full flex items-center justify-center mx-auto mb-4">
              <IconLogin size={32} className="text-black" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-heading)] mb-2">
              ورود به حساب کاربری
            </h1>
            <p className="text-[var(--text-subtle)]">به رؤیاژه خوش آمدید</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username/Email Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-[var(--text-primary)] font-medium mb-2"
              >
                نام کاربری یا ایمیل
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-4 py-3 pr-12 rounded-lg border ${
                    errors.username ? "border-red-500" : "border-gray-700"
                  } focus:border-[var(--accent-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)]`}
                  placeholder="نام کاربری یا آدرس ایمیل خود را وارد کنید"
                />
                <IconUser
                  size={20}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-subtle)]"
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-[var(--text-primary)] font-medium mb-2"
              >
                رمز عبور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full bg-[var(--secondary-bg)] text-[var(--text-primary)] px-4 py-3 pr-12 pl-12 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } focus:border-[var(--accent-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)]`}
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <IconLock
                  size={20}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-subtle)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-subtle)] hover:text-[var(--text-primary)]"
                >
                  {showPassword ? (
                    <IconEyeOff size={20} />
                  ) : (
                    <IconEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* reCAPTCHA */}
            <div>
              <ReCAPTCHA
                sitekey={
                  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                } // Test key
                onChange={onRecaptchaChange}
                theme="dark"
              />
              {errors.recaptcha && (
                <p className="text-red-400 text-sm mt-1">{errors.recaptcha}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--accent-gold)] text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  در حال ورود...
                </>
              ) : (
                <>
                  <IconLogin size={20} />
                  ورود
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[var(--text-subtle)]">
              حساب کاربری ندارید؟{" "}
              <Link
                href="/auth/register"
                className="text-[var(--accent-gold)] hover:text-yellow-400 font-medium"
              >
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
