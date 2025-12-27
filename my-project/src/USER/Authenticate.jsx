import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Phone,
  Calendar,
  Key,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Shield,
  Smartphone,
  RefreshCw,
  AlertCircle,
  Home,
} from "lucide-react";

const AuthPage = () => {
  const [authMode, setAuthMode] = useState("login"); // "login", "signup", "verify", "reset"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    birthDate: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();

  // Mock user database (in real app, this would be your backend)
  const mockUsers = [
    {
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
      verified: true,
    },
  ];

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password strength validation
  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumbers,
      strength: {
        length: hasMinLength,
        upper: hasUpperCase,
        lower: hasLowerCase,
        number: hasNumbers,
        special: hasSpecialChar,
      },
    };
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }

      // Clear OTP error
      if (otpError) setOtpError("");
    }
  };

  // Handle OTP key events
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (authMode === "login" || authMode === "signup") {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    if (authMode === "signup") {
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must accept the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === formData.email);

      if (user) {
        if (user.password === formData.password) {
          // In real app, send OTP to email
          setAuthMode("verify");
          startCountdown();
        } else {
          setErrors({ password: "Invalid password" });
        }
      } else {
        // User doesn't exist, show signup option
        setAuthMode("signup");
      }

      setIsLoading(false);
    }, 1500);
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Send OTP to email
      setAuthMode("verify");
      startCountdown();
      setIsLoading(false);
    }, 1500);
  };

  // Verify OTP
  const verifyOtp = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setOtpError("Please enter complete OTP");
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      if (otpCode === "123456") {
        // Mock correct OTP
        // Success - navigate to home
        navigate("/");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Resend OTP
  const resendOtp = () => {
    if (!resendEnabled) return;

    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    startCountdown();

    // Simulate resend API call
    setTimeout(() => {
      // Show success message
      alert("New OTP sent to your email!");
    }, 500);
  };

  // Start countdown for OTP resend
  const startCountdown = () => {
    setCountdown(60);
    setResendEnabled(false);
  };

  // Countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Reset password
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }

    setIsLoading(true);

    // Simulate reset password email
    setTimeout(() => {
      alert("Password reset instructions sent to your email!");
      setAuthMode("login");
      setIsLoading(false);
    }, 1500);
  };

  // Password strength indicator
  const passwordStrength = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-3 sm:px-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {authMode === "login" && "Welcome Back"}
            {authMode === "signup" && "Create Account"}
            {authMode === "verify" && "Verify Your Email"}
            {authMode === "reset" && "Reset Password"}
          </h1>
          <p className="text-gray-600">
            {authMode === "login" && "Sign in to your account to continue"}
            {authMode === "signup" && "Join thousands of satisfied customers"}
            {authMode === "verify" && "Enter the OTP sent to your email"}
            {authMode === "reset" &&
              "We'll send reset instructions to your email"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-gray-100">
            <div
              className={`h-full transition-all duration-500 ${authMode === "login"
                  ? "w-1/3"
                  : authMode === "signup"
                    ? "w-2/3"
                    : "w-full"
                } bg-gradient-to-r from-purple-600 to-pink-600`}
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* Back Button */}
            {(authMode === "verify" ||
              authMode === "signup" ||
              authMode === "reset") && (
                <button
                  onClick={() =>
                    setAuthMode(authMode === "verify" ? "login" : "login")
                  }
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                  <ArrowLeft size={18} />
                  <span>Back</span>
                </button>
              )}

            {/* Login Form */}
            {authMode === "login" && (
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? "border-red-300" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMode("reset")}
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full pl-10 pr-10 py-3 rounded-lg border ${errors.password ? "border-red-300" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className="font-semibold text-purple-600 hover:text-purple-700"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* Signup Form */}
            {authMode === "signup" && (
              <form onSubmit={handleSignup} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.fullName ? "border-red-300" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? "border-red-300" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full pl-10 pr-10 py-3 rounded-lg border ${errors.password ? "border-red-300" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-3 space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i <=
                                Object.values(passwordStrength.strength).filter(
                                  (v) => v
                                ).length
                                ? passwordStrength.isValid
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                                : "bg-gray-200"
                              }`}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          {passwordStrength.strength.length ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <XCircle className="w-3 h-3 text-gray-400" />
                          )}
                          <span
                            className={
                              passwordStrength.strength.length
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            8+ characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {passwordStrength.strength.upper ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <XCircle className="w-3 h-3 text-gray-400" />
                          )}
                          <span
                            className={
                              passwordStrength.strength.upper
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            Uppercase
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {passwordStrength.strength.lower ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <XCircle className="w-3 h-3 text-gray-400" />
                          )}
                          <span
                            className={
                              passwordStrength.strength.lower
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            Lowercase
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {passwordStrength.strength.number ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <XCircle className="w-3 h-3 text-gray-400" />
                          )}
                          <span
                            className={
                              passwordStrength.strength.number
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            Number
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={`w-full pl-10 pr-10 py-3 rounded-lg border ${errors.confirmPassword
                          ? "border-red-300"
                          : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) =>
                        handleInputChange("termsAccepted", e.target.checked)
                      }
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className="font-semibold text-purple-600 hover:text-purple-700"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* OTP Verification */}
            {authMode === "verify" && (
              <div className="space-y-6">
                {/* Email Display */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Check your email
                  </h2>
                  <p className="text-gray-600 mb-1">
                    We've sent a 6-digit code to
                  </p>
                  <p className="font-medium text-gray-800">{formData.email}</p>
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-sm text-purple-600 hover:text-purple-700 mt-2"
                  >
                    Wrong email?
                  </button>
                </div>

                {/* OTP Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                      Enter verification code
                    </label>
                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(e.target.value, index)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                        />
                      ))}
                    </div>
                    {otpError && (
                      <p className="mt-3 text-sm text-red-600 text-center flex items-center justify-center gap-1">
                        <AlertCircle size={14} />
                        {otpError}
                      </p>
                    )}
                  </div>

                  {/* Countdown & Resend */}
                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-sm text-gray-600">
                        Resend code in{" "}
                        <span className="font-semibold">{countdown}s</span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={resendOtp}
                        className={`text-sm font-medium ${resendEnabled
                            ? "text-purple-600 hover:text-purple-700"
                            : "text-gray-400 cursor-not-allowed"
                          }`}
                        disabled={!resendEnabled}
                      >
                        Didn't receive code? Resend
                      </button>
                    )}
                  </div>

                  {/* Verify Button */}
                  <button
                    onClick={verifyOtp}
                    disabled={isLoading || otp.join("").length !== 6}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      "Verify & Continue"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Reset Password */}
            {authMode === "reset" && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
                    <Key className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Reset your password
                  </h2>
                  <p className="text-gray-600">
                    Enter your email address and we'll send you instructions to
                    reset your password.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? "border-red-300" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </button>

                {/* Back to Login */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    ← Back to login
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Your data is secured with 256-bit encryption</span>
            </div>
          </div>
        </div>

        {/* Skip Login Button (for demo) */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <Home size={16} />
            <span>Continue as guest</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* This would be a toast component in real app */}
      </div>
    </div>
  );
};
export default AuthPage;
