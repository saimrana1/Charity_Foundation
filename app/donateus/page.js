"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Heart,
  DollarSign,
  CreditCard,
  Banknote,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Loader2,
  Phone,
  Mail,
  Clock,
  Users,
  Shield,
  Eye,
  MessageCircle,
  Star,
  Award,
} from "lucide-react";

export default function DonationPage() {
  const [formData, setFormData] = useState({
    amount: "",
    customAmount: "",
    method: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const paymentMethods = [
    {
      value: "card",
      icon: CreditCard,
      title: "Credit/Debit Card",
      description: "Secure online payment",
      popular: true,
    },
    {
      value: "cash",
      icon: Banknote,
      title: "Cash Donation",
      description: "In-person or bank transfer",
      popular: false,
    },
  ];

  const impactExamples = [
    { amount: 500, impact: "Provides meals for 5 families for a day" },
    { amount: 1000, impact: "School supplies for 3 children for a month" },
    { amount: 2500, impact: "Medical aid for emergency treatment" },
    { amount: 5000, impact: "Clean water access for 20 families" },
    { amount: 10000, impact: "Education support for 2 children for a year" },
  ];

  const validateForm = () => {
    const newErrors = {};

    const finalAmount =
      formData.amount === "custom" ? formData.customAmount : formData.amount;

    if (!finalAmount) {
      newErrors.amount = "Please select or enter an amount";
    } else if (isNaN(finalAmount) || parseFloat(finalAmount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    } else if (parseFloat(finalAmount) < 100) {
      newErrors.amount = "Minimum donation amount is Rs 100";
    }

    if (!formData.method) {
      newErrors.method = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear custom amount if predefined amount is selected
    if (field === "amount" && value !== "custom") {
      setFormData((prev) => ({ ...prev, customAmount: "" }));
    }

    // Clear error when user makes changes
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const finalAmount =
        formData.amount === "custom" ? formData.customAmount : formData.amount;

      // Replace this with your actual API call using axios
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/donation/create`,
        {
          amount: parseFloat(finalAmount),
          method: formData.method,
          message: formData.message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setFormSubmitted(true);
      setFormData({
        amount: "",
        customAmount: "",
        method: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setErrors({
        submit: "Failed to process donation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      amount: "",
      customAmount: "",
      method: "",
      message: "",
    });
    setErrors({});
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("PKR", "Rs ");
  };

  const getImpactText = () => {
    const finalAmount =
      formData.amount === "custom"
        ? parseFloat(formData.customAmount)
        : parseFloat(formData.amount);
    if (!finalAmount || isNaN(finalAmount)) return "";

    // Find closest impact example
    const closest = impactExamples.reduce((prev, curr) =>
      Math.abs(curr.amount - finalAmount) < Math.abs(prev.amount - finalAmount)
        ? curr
        : prev
    );

    return closest.impact;
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"></div>

          {/* Success Animation */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Heart className="text-white animate-bounce" size={48} />
            </div>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 fill-current animate-pulse"
                  size={20}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Thank You for Your Generosity! 🙏
          </h1>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Your donation has been received and is now being processed. Your
            kindness will make a real difference in someone's life.
          </p>

          {/* Donation Impact */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
            <div className="flex items-center justify-center mb-4">
              <Award className="text-green-600 mr-2" size={24} />
              <h3 className="font-bold text-gray-800 text-lg">Your Impact</h3>
            </div>
            <p className="text-green-700 font-medium">{getImpactText()}</p>
          </div>

          {/* Process Timeline */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Clock className="mr-2 text-blue-500" size={20} />
              What happens next?
            </h3>
            <div className="space-y-4 text-sm text-gray-700 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Processing (1-2 hours)</p>
                  <p className="text-gray-600">
                    Your donation is being verified and processed securely
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Allocation (24-48 hours)</p>
                  <p className="text-gray-600">
                    We identify and match your donation with someone in need
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Impact Report (Within 1 week)</p>
                  <p className="text-gray-600">
                    You'll receive an email with details about how your donation
                    helped, including recipient's story (with their permission)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Shield className="mr-2 text-blue-500" size={20} />
              Our Commitment to You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Eye className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="font-medium text-gray-800">100% Transparency</p>
                <p className="text-gray-600">
                  Track exactly where your donation goes
                </p>
              </div>
              <div className="text-center">
                <Users className="mx-auto text-green-500 mb-2" size={24} />
                <p className="font-medium text-gray-800">Direct Impact</p>
                <p className="text-gray-600">
                  Your money reaches those who need it most
                </p>
              </div>
              <div className="text-center">
                <Mail className="mx-auto text-purple-500 mb-2" size={24} />
                <p className="font-medium text-gray-800">Regular Updates</p>
                <p className="text-gray-600">
                  Stay informed about your donation's impact
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Need to contact us?</strong>
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center text-blue-600">
                <Phone size={16} className="mr-1" />
                <span>+92-300-1234567</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Mail size={16} className="mr-1" />
                <span>donations@charity.org</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={resetForm}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Make Another Donation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-3xl">
                <Heart className="text-white animate-pulse" size={40} />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Make a Difference Today</h1>
            <p className="text-xl text-green-100 mb-2">
              Your generosity creates hope and transforms lives
            </p>
            <p className="text-green-200 text-sm">
              Join thousands of donors who are making a real impact in our
              community
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Form Section */}
          <div className="p-8">
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                <AlertCircle
                  className="text-red-500 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="space-y-8">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center">
                  <DollarSign className="mr-2 text-green-500" size={20} />
                  Choose Your Donation Amount *
                </label>

                {/* Predefined Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() =>
                        handleInputChange("amount", amount.toString())
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                        formData.amount === amount.toString()
                          ? "border-green-500 bg-green-50 shadow-md transform scale-105"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div className="text-xl font-bold text-gray-800">
                        {formatAmount(amount)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {
                          impactExamples.find((e) => e.amount === amount)
                            ?.impact
                        }
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange("amount", "custom")}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.amount === "custom"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="font-semibold text-gray-800 mb-2">
                      Custom Amount
                    </div>
                    {formData.amount === "custom" && (
                      <input
                        type="number"
                        value={formData.customAmount}
                        onChange={(e) =>
                          handleInputChange("customAmount", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter amount in Rs"
                        min="100"
                      />
                    )}
                  </button>
                </div>

                {errors.amount && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.amount}
                  </p>
                )}

                {/* Impact Preview */}
                {getImpactText() && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm text-green-700 flex items-center">
                      <Award className="mr-2 text-green-600" size={16} />
                      <strong>Your Impact: </strong>
                      {getImpactText()}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center">
                  <CreditCard className="mr-2 text-blue-500" size={20} />
                  Select Payment Method *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() =>
                          handleInputChange("method", method.value)
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md relative ${
                          formData.method === method.value
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        {method.popular && (
                          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                        <div className="flex items-center space-x-3">
                          <Icon size={24} className="text-blue-500" />
                          <div>
                            <div className="font-semibold text-gray-800">
                              {method.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {method.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.method && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.method}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <MessageCircle className="mr-2 text-purple-500" size={18} />
                  Personal Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 resize-none"
                  placeholder="Share why you're donating or leave a message of hope for the recipient..."
                />
                <p className="mt-2 text-xs text-gray-500">
                  Your message may be shared with the recipient (with your
                  permission)
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitDonation}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl text-lg font-bold hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-100 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={24} />
                    Processing Donation...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Heart className="mr-2" size={24} />
                    Donate{" "}
                    {formData.amount && formData.amount !== "custom"
                      ? formatAmount(formData.amount)
                      : formData.customAmount
                      ? formatAmount(formData.customAmount)
                      : "Now"}
                    <ArrowRight className="ml-2" size={24} />
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:border-l border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Shield className="mr-3 text-green-500" size={28} />
              Why Donate With Us?
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    100% Transparency
                  </h4>
                  <p className="text-gray-600 text-sm">
                    See exactly where your donation goes and receive detailed
                    impact reports with photos and stories.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="text-green-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Direct Impact
                  </h4>
                  <p className="text-gray-600 text-sm">
                    95% of your donation goes directly to those in need. Only 5%
                    covers essential operational costs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Personal Updates
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Receive email updates with the recipient's story and how
                    your donation made a difference.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="text-yellow-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Verified Recipients
                  </h4>
                  <p className="text-gray-600 text-sm">
                    All recipients are thoroughly vetted to ensure your donation
                    reaches genuine cases of need.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <h4 className="font-semibold text-gray-800 mb-4">
                Trusted by 10,000+ Donors
              </h4>
              <div className="flex items-center space-x-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-current"
                    size={16}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  4.9/5 (2,847 reviews)
                </span>
              </div>
              <p className="text-sm text-gray-600">
                "This organization is incredibly transparent. I received photos
                and updates about exactly how my donation helped a family in
                need." - Sarah K.
              </p>
            </div>

            {/* Security */}
            <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="text-green-500" size={16} />
                <span className="font-semibold text-gray-800 text-sm">
                  Secure & Safe
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Your payment information is encrypted and secure. We never store
                your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
