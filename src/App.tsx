import React, { useState, useEffect } from "react";
import { Lock, CheckCircle2, XCircle, AlertTriangle, Shield,
  CreditCard, Wallet, Building2, Clock, ArrowRight,
  Sparkles, Star, Globe, Activity, Users, Award,
  ShieldCheck, TrendingUp, DollarSign, Menu, X, FileText
} from "lucide-react";

// =========================================
// PREMIUM SUBSCRIPTION RENEWAL - FAKE PAGE
// =========================================

const renewalCountdown = 72; // 72 hours until access is blocked
const duesAmount = "₹499";
const planType = "Premium Life Time Membership";
const memberSince = "January 2025";

export default function App() {
  const [countdown, setCountdown] = useState(renewalCountdown * 60); // seconds
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  };

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI / Google Pay / PhonePe',
      icon: Wallet,
      color: '#FFC107',
      desc: 'QR Code will be generated in payment window',
      time: 'Instant',
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      icon: CreditCard,
      color: '#E3F2FD',
      desc: 'Visa, Mastercard, RuPay supported',
      time: '2-5 minutes',
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building2,
      color: '#E8F5E9',
      desc: 'All major banks supported',
      time: '5-10 minutes',
    },
    {
      id: 'wallets',
      name: 'Paytm, Amazon Pay, PhonePe Wallet',
      icon: Wallet,
      color: '#F3E5F5',
      desc: 'Wallet balance deduction',
      time: 'Instant',
    },
  ];

  if (isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-green-500/10 border border-green-500/50 rounded-3xl p-12 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Payment Verified!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Your premium subscription is active. <br />
              You can now access all premium features.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Continue to App
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-700 backdrop-blur-sm bg-black/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              OmniRoute
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              SECURE PAYMENT
            </span>
            <div className="bg-amber-500/20 border border-amber-500/50 rounded-full px-4 py-2">
              <span className="text-amber-400 font-semibold">Security Level: HIGH</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Urgency Banner */}
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 mb-8 flex items-center gap-4 animate-pulse">
          <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-red-400">Payment Required</h2>
            <p className="text-gray-300">
              Your subscription is expiring soon. Please renew to maintain uninterrupted access.
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-black/30 rounded-lg px-4 py-2">
            <Clock className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-mono text-lg">{formatTime(countdown)}</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Left - Plan Details */}
          <div className="bg-gradient-to-br from-amber-900/20 to-gray-900/40 border border-amber-500/30 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-10 h-10 text-amber-400" />
              <div>
                <h2 className="text-3xl font-bold text-white">Plan Renewal</h2>
                <p className="text-gray-400">Premium Lifetime Membership</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Plan Name</span>
                <span className="text-white font-semibold">{planType}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white font-semibold">{memberSince}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Amount Due</span>
                <span className="text-emerald-400 font-bold text-2xl">{duesAmount}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Renewal Status</span>
                <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full font-semibold">
                  Due - Payment Pending
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Auto-renewal</span>
                <span className="text-green-400 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  Disabled (Manual Payment)
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-500/25"
            >
              <DollarSign className="w-5 h-5 inline mr-2" />
              Pay Now - {duesAmount}
            </button>
          </div>

          {/* Right - Trust & Features */}
          <div className="space-y-6">
            {/* Trust Badges */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-400" />
                Trusted & Secure
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>256-bit SSL encryption for all payments</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Payment handled by secure payment gateway</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>No upfront payment required</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Instant receipt and email confirmation</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-amber-400" />
                Multiple Payment Options
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.slice(0, 4).map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => {
                        setSelectedMethod(method.name);
                        setShowPaymentModal(true);
                      }}
                      className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-amber-500/50 rounded-xl p-4 text-left transition-all duration-300"
                    >
                      <Icon
                        className="w-6 h-6 mb-2"
                        style={{ color: method.color }}
                      />
                      <p className="font-semibold text-sm">{method.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{method.time}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ & Support */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Activity className="w-7 h-7 text-blue-400" />
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-amber-400 mb-2">Where can I pay?</h4>
                <p className="text-gray-400 text-sm">
                  You can pay using UPI, Credit/Debit Cards, Net Banking, or popular wallets like Paytm, PhonePe, Amazon Pay.
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-amber-400 mb-2">Will I get a receipt?</h4>
                <p className="text-gray-400 text-sm">
                  Yes! You'll receive an instant digital receipt via email and can download it anytime.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-amber-400 mb-2">How long to verify payment?</h4>
                <p className="text-gray-400 text-sm">
                  Most payments are verified within 1-5 minutes. Some payments may take up to 30 minutes during high traffic.
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-amber-400 mb-2">What if payment fails?</h4>
                <p className="text-gray-400 text-sm">
                  If payment fails, you can retry. The charge will not be processed unless the payment is successful.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-400 mb-2">Important Notice</h4>
              <p className="text-gray-400 text-sm">
                {`By making this payment, you agree to the Terms & Conditions of OmniRoute.
                Your subscription will be renewed for another year from today.
                Access to the Premium features will be restored automatically upon successful payment verification.`}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-12 py-8 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p className="mb-2">
            © 2025 OmniRoute. All rights reserved.
          </p>
          <p className="text-xs">
            Secure Payment Verified by Razorpay/Stripe/Other Gateway
          </p>
        </div>
      </footer>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          amount={duesAmount}
          planType={planType}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={(paid) => {
            setPaymentSuccess(paid);
            setShowPaymentModal(false);
            setIsPaid(paid);
          }}
          selectedMethod={selectedMethod}
        />
      )}
    </div>
  );
}

// =========================================
// PAYMENT MODAL COMPONENT
// ==========================================
function PaymentModal({
  amount,
  planType,
  onClose,
  onSuccess,
  selectedMethod,
}: {
  amount: string;
  planType: string;
  onClose: () => void;
  onSuccess: (paid: boolean) => void;
  selectedMethod: string | null;
}) {
  const [paymentStep, setPaymentStep] = useState<'select' | 'processing' | 'success' | 'failure'>('select');
  const [processingTime, setProcessingTime] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = () => {
    setPaymentStep('processing');
    startProcessing();
  };

  const startProcessing = () => {
    const interval = setInterval(() => {
      setProcessingTime((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          // Simulate successful payment
          setTimeout(() => {
            setPaymentStep('success');
            setShowSuccess(true);
            onSuccess(true);
          }, 1000);
          return 5;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleSimulation = () => {
    setPaymentStep('processing');
    startProcessing();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl max-w-lg w-full p-8 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shine-effect">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Payment Step Content */}
        {paymentStep === 'select' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
            <p className="text-gray-400 mb-6">
              {selectedMethod || 'Select your payment method'}
            </p>

            <div className="space-y-3 mb-8">
              {['UPI / GPay / PhonePe', 'Credit / Debit Card', 'Net Banking', 'Paytm / Amazon Pay'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentStep('select')}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {method}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              Amount: <span className="text-white font-bold">{amount}</span>
            </p>
          </div>
        )}

        {paymentStep === 'processing' && (
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Processing Payment</h2>
            <p className="text-gray-400 mb-4">Please wait while we verify your payment</p>

            <div className="bg-gray-700/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="text-gray-400">Time remaining:</span>
                <span className="text-green-400 font-mono text-lg">{5 - processingTime}s</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span>Connecting to payment gateway...</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span>Verifying payment...</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span>Generating receipt...</span>
              </div>
            </div>
          </div>
        )}

        {paymentStep === 'success' && showSuccess && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-300">
              You have successfully renewed your subscription.
            </p>

            <div className="bg-gray-700/30 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="text-white">{planType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-green-400 font-bold">{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Receipt ID:</span>
                <span className="text-white font-mono">ORD-2025-00123456</span>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              An email confirmation has been sent to your registered email address.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              Continue to App
            </button>
          </div>
        )}

        {paymentStep === 'failure' && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Payment Failed</h2>
            <div className="bg-gray-700/30 rounded-xl p-4 mb-6">
              <p className="text-gray-400 mb-2">Reason:</p>
              <p className="text-red-400 font-semibold">Payment was declined by your bank or payment provider</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}