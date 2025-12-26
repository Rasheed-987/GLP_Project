"use client";

import { useState } from "react";
import Button from "./Button";
import Image from "next/image";

type NominationFormProps = {
  dict: {
    yourDetails: string;
    fullName: string;
    organization: string;
    email: string;
    nomineeDetails: string;
    nomineeName: string;
    nomineeOrg: string;
    nomineeEmail: string;
    reason: string;
    submit: string;
    successTitle: string;
    successMessage: string;
  };
};

export default function NominationForm({ dict }: NominationFormProps) {
  const [formData, setFormData] = useState({
    nominatorName: "",
    nominatorOrg: "",
    nominatorEmail: "",
    nomineeName: "",
    nomineeOrg: "",
    nomineeEmail: "",
    reason: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nominatorName.trim()) newErrors.nominatorName = "Required";
    if (!formData.nominatorOrg.trim()) newErrors.nominatorOrg = "Required";
    if (!formData.nominatorEmail.trim()) {
      newErrors.nominatorEmail = "Required";
    } else if (!emailRegex.test(formData.nominatorEmail)) {
      newErrors.nominatorEmail = "Invalid email";
    }

    if (!formData.nomineeName.trim()) newErrors.nomineeName = "Required";
    if (!formData.nomineeOrg.trim()) newErrors.nomineeOrg = "Required";
    if (!formData.nomineeEmail.trim()) {
      newErrors.nomineeEmail = "Required";
    } else if (!emailRegex.test(formData.nomineeEmail)) {
      newErrors.nomineeEmail = "Invalid email";
    }

    if (!formData.reason.trim()) newErrors.reason = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 h-full animate-in fade-in duration-500">
        <div className="mb-6 relative w-24 h-24">
             <Image src="/images/success.png" alt="Success" fill className="object-contain" />
        </div>
        <h3 className="text-xl md:text-2xl text-[#006A8E] leading-tight">
          {dict.successTitle}
        </h3>
        <h3 className="text-xl md:text-2xl font-bold text-[#006A8E] mb-6 leading-tight">
          [{formData.nomineeName}]
        </h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
          {dict.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h4 className="text-sm font-bold tracking-widest text-brand-blue mb-4">
          {dict.yourDetails}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="w-full">
            <input
              type="text"
              name="nominatorName"
              value={formData.nominatorName}
              onChange={handleChange}
              placeholder={dict.fullName}
              className={`w-full px-5 py-3 rounded-full bg-[#E6EFEA] border ${
                errors.nominatorName ? "border-red-500" : "border-black/5"
              } text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm`}
            />
            {errors.nominatorName && (
              <p className="text-red-500 text-xs mt-1 ml-2">{errors.nominatorName}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              name="nominatorOrg"
              value={formData.nominatorOrg}
              onChange={handleChange}
              placeholder={dict.organization}
              className={`w-full px-5 py-3 rounded-full bg-[#E6EFEA] border ${
                errors.nominatorOrg ? "border-red-500" : "border-black/5"
              } text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm`}
            />
            {errors.nominatorOrg && (
              <p className="text-red-500 text-xs mt-1 ml-2">{errors.nominatorOrg}</p>
            )}
          </div>
        </div>
        <div className="w-full mt-3">
          <input
            type="email"
            name="nominatorEmail"
            value={formData.nominatorEmail}
            onChange={handleChange}
            placeholder={dict.email}
            className={`w-full px-5 py-3 rounded-full bg-[#E6EFEA] border ${
              errors.nominatorEmail ? "border-red-500" : "border-black/5"
            } text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm`}
          />
          {errors.nominatorEmail && (
            <p className="text-red-500 text-xs mt-1 ml-2">{errors.nominatorEmail}</p>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold tracking-widest text-brand-blue mb-4">
          {dict.nomineeDetails}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="w-full">
            <input
              type="text"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={handleChange}
              placeholder={dict.nomineeName}
              className={`w-full px-5 py-3 rounded-full bg-[#E6EFEA] border ${
                errors.nomineeName ? "border-red-500" : "border-black/5"
              } text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm`}
            />
            {errors.nomineeName && (
              <p className="text-red-500 text-xs mt-1 ml-2">{errors.nomineeName}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              name="nomineeOrg"
              value={formData.nomineeOrg}
              onChange={handleChange}
              placeholder={dict.nomineeOrg}
              className={`w-full px-5 py-3 rounded-full bg-[#E6EFEA] border ${
                errors.nomineeOrg ? "border-red-500" : "border-black/5"
              } text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm`}
            />
            {errors.nomineeOrg && (
              <p className="text-red-500 text-xs mt-1 ml-2">{errors.nomineeOrg}</p>
            )}
          </div>
        </div>
        <div className="w-full mt-3">
          <input
            type="email"
            name="nomineeEmail"
            value={formData.nomineeEmail}
            onChange={handleChange}
            placeholder={dict.nomineeEmail}
            className={`w-full px-5 py-3 rounded-full bg-[#E6EFEA] border ${
              errors.nomineeEmail ? "border-red-500" : "border-black/5"
            } text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-sm`}
          />
          {errors.nomineeEmail && (
            <p className="text-red-500 text-xs mt-1 ml-2">{errors.nomineeEmail}</p>
          )}
        </div>
        <div className="w-full mt-3">
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder={dict.reason}
            rows={4}
            className={`w-full px-5 py-3 rounded-[20px] bg-[#E6EFEA] border ${
              errors.reason ? "border-red-500" : "border-black/5"
            } text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 resize-none text-sm`}
          />
          {errors.reason && (
            <p className="text-red-500 text-xs mt-1 ml-2">{errors.reason}</p>
          )}
        </div>
      </div>

      <Button className="w-full py-4 rounded-full tracking-widest uppercase text-sm" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : dict.submit}
      </Button>
    </form>
  );
}
