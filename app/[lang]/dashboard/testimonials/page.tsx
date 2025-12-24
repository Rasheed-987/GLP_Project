"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Plus, ChevronLeft, ChevronRight, Edit2, Trash2, Calendar, Clock, CheckCircle, XCircle, ChevronDown, User, Briefcase, Award, Image as ImageIcon } from "lucide-react";
import clientApi from "@/lib/clientApi";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

interface Achievement {
    value: {
        en: string;
        ar: string;
    };
    label: {
        en: string;
        ar: string;
    };
}

interface Testimonial {
    id: string;
    name: {
        en: string;
        ar: string;
    };
    profession: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    graduateDate: {
        en: string;
        ar: string;
    };
    companyLogo: string;
    image: string;
    achievements: [Achievement, Achievement, Achievement];
    status: {
        en: "active" | "inactive";
        ar: "active" | "inactive";
    };
    createdAt: string;
}

export default function TestimonialsPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = useState<any>(null);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [actionId, setActionId] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const imageInputRef = React.useRef<HTMLInputElement>(null);

    const [statusDropdownOpenEn, setStatusDropdownOpenEn] = useState(false);
    const [statusDropdownOpenAr, setStatusDropdownOpenAr] = useState(false);
    const [selectedStatusEn, setSelectedStatusEn] = useState<"active" | "inactive">("active");
    const [selectedStatusAr, setSelectedStatusAr] = useState<"active" | "inactive">("active");

    const itemsPerPage = 10;

    const fetchTestimonials = useCallback(async () => {
        try {
            const response = await clientApi.get("/api/testimonials");
            setTestimonials(response.data);
        } catch {
            toast.error("Failed to fetch testimonials");
        }
    }, []);

    useEffect(() => {
        getDictionary(lang).then(setDict);
        fetchTestimonials();
    }, [lang, fetchTestimonials]);

    useEffect(() => {
        if (editingTestimonial) {
            setSelectedStatusEn(editingTestimonial.status.en);
            setSelectedStatusAr(editingTestimonial.status.ar);
            setLogoPreview(editingTestimonial.companyLogo);
            setImagePreview(editingTestimonial.image);
        } else {
            setSelectedStatusEn("active");
            setSelectedStatusAr("active");
            setLogoPreview(null);
            setImagePreview(null);
        }
    }, [editingTestimonial]);

    if (!dict) return null;

    const totalPages = Math.ceil(testimonials.length / itemsPerPage);
    const currentTestimonials = testimonials.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const toggleStatus = async (id: string, currentStatus: any) => {
        setActionId(id);
        setIsLoading(true);
        try {
            const newStatusEn = currentStatus.en === "active" ? "inactive" : "active";
            const newStatusAr = currentStatus.ar === "active" ? "inactive" : "active";

            await clientApi.put(`/api/testimonials/${id}`, {
                status: {
                    en: newStatusEn,
                    ar: newStatusAr
                }
            });
            await fetchTestimonials();
            toast.success("Status updated successfully");
        } catch {
            toast.error("Failed to update status");
        } finally {
            setIsLoading(false);
            setActionId(null);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeletingId(id);
        setIsDeleteModalOpen(true);
    };

    const deleteTestimonial = async () => {
        if (!deletingId) return;
        setIsLoading(true);
        try {
            await clientApi.delete(`/api/testimonials/${deletingId}`);
            await fetchTestimonials();
            toast.success("Testimonial deleted successfully");
            setIsDeleteModalOpen(false);
        } catch {
            toast.error("Failed to delete testimonial");
        } finally {
            setIsLoading(false);
            setDeletingId(null);
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-8 pb-10 text-[#00000099] animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Headers */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-black tracking-tight flex items-center gap-2">
                        {dict.dashboard.sidebar.testimonials}
                    </h1>
                    <p className="text-[#00000099] text-sm mt-1">
                        Manage participant feedback and achievement stories.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingTestimonial(null);
                        setLogoPreview(null);
                        setImagePreview(null);
                        setIsModalOpen(true);
                        setStatusDropdownOpenEn(false);
                        setStatusDropdownOpenAr(false);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all group cursor-pointer"
                >
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    Add New Testimonial
                </button>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-2xl border border-border-stroke overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F7FAF9] border-b border-border-stroke">
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">Name & Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">Graduate Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">Created</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-stroke">
                            {currentTestimonials.map((item) => (
                                <tr key={item.id} className="group hover:bg-[#F7FAF9]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-border-stroke flex items-center justify-center shrink-0 overflow-hidden text-[#00000033]">
                                                {item.image ? (
                                                    <img src={item.image} alt="Avatar" className="w-full h-full object-cover" />
                                                ) : item.companyLogo ? (
                                                    <img src={item.companyLogo} alt="Logo" className="w-full h-full object-contain p-1.5" />
                                                ) : (
                                                    <User className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-bold text-black line-clamp-1">
                                                    {lang === 'ar' ? item.name.ar : item.name.en}
                                                </p>
                                                <p className="text-[11px] text-[#00000099] line-clamp-1">
                                                    {lang === 'ar' ? item.profession.ar : item.profession.en}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(item.id, item.status)}
                                            disabled={isLoading && actionId === item.id}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all disabled:opacity-50
                                                ${item.status[lang] === "active"
                                                    ? "bg-[#E6F4F1] text-[#019977] hover:bg-[#019977] hover:text-white"
                                                    : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"}`}
                                        >
                                            {isLoading && actionId === item.id ? (
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                item.status[lang] === "active" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                                            )}
                                            {item.status[lang]}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex whitespace-nowrap items-center gap-2 text-xs text-[#00000099]">
                                            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                                            {lang === 'ar' ? item.graduateDate.ar : item.graduateDate.en}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-xs text-[#00000066]">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setEditingTestimonial(item);
                                                    setIsModalOpen(true);
                                                    setStatusDropdownOpenEn(false);
                                                    setStatusDropdownOpenAr(false);
                                                }}
                                                className="p-2 text-[#00000066] hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all cursor-pointer"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(item.id)}
                                                disabled={deletingId === item.id}
                                                className="p-2 text-[#00000066] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-[#F7FAF9] border-t border-border-stroke flex items-center justify-between">
                    <p className="text-xs text-[#00000066] font-medium">
                        Showing <span className="text-black">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-black">{Math.min(currentPage * itemsPerPage, testimonials.length)}</span> of <span className="text-black">{testimonials.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="p-2 border border-border-stroke rounded-lg disabled:opacity-30 hover:bg-white transition-all cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer
                                    ${currentPage === page
                                        ? "bg-brand-gradient text-white shadow-md shadow-brand-blue/20"
                                        : "hover:bg-white text-[#00000066] border border-transparent hover:border-border-stroke"}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="p-2 border border-border-stroke rounded-lg disabled:opacity-30 hover:bg-white transition-all cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 max-h-[96vh]">
                        <div className="p-8 border-b border-border-stroke flex items-center justify-between bg-[#F7FAF9] shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-black">{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</h3>
                                <p className="text-[#00000099] text-xs mt-1">Provide the testimonials and achievements in both English and Arabic.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full text-[#00000066] transition-colors cursor-pointer">
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <form className="flex-1 overflow-y-auto p-8 space-y-8" onSubmit={async (e) => {
                            e.preventDefault();
                            if (isLoading) return;
                            setIsLoading(true);
                            const formData = new FormData(e.currentTarget);

                            const achievements = [0, 1, 2].map(idx => ({
                                value: {
                                    en: formData.get(`achievement_val_en_${idx}`),
                                    ar: formData.get(`achievement_val_ar_${idx}`)
                                },
                                label: {
                                    en: formData.get(`achievement_lbl_en_${idx}`),
                                    ar: formData.get(`achievement_lbl_ar_${idx}`)
                                }
                            }));

                            // Prepare payload
                            const payload = {
                                name: {
                                    en: formData.get('nameEn'),
                                    ar: formData.get('nameAr')
                                },
                                profession: {
                                    en: formData.get('professionEn'),
                                    ar: formData.get('professionAr')
                                },
                                description: {
                                    en: formData.get('descEn'),
                                    ar: formData.get('descAr')
                                },
                                graduateDate: {
                                    en: formData.get('dateEn'),
                                    ar: formData.get('dateAr')
                                },
                                companyLogo: logoPreview || '',
                                image: imagePreview || '',
                                achievements,
                                status: {
                                    en: selectedStatusEn,
                                    ar: selectedStatusAr
                                }
                            };

                            try {
                                if (editingTestimonial) {
                                    await clientApi.put(`/api/testimonials/${editingTestimonial.id}`, payload);
                                    toast.success("Testimonial updated successfully");
                                } else {
                                    await clientApi.post("/api/testimonials", payload);
                                    toast.success("Testimonial created successfully");
                                }
                                setIsModalOpen(false);
                                fetchTestimonials();
                            } catch {
                                toast.error("Failed to save testimonial");
                            } finally {
                                setIsLoading(false);
                            }
                        }}>
                            <div className="space-y-8">
                                {/* Basic Info Section */}
                                <div className="space-y-4">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest border-l-4 border-brand-blue pl-3">
                                        Basic Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Participant Name (ENG)</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00000066]" />
                                                    <input type="text" name="nameEn" placeholder="Full Name..." defaultValue={editingTestimonial?.name.en} className="w-full pl-11 pr-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" required />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Job Profession / Subtitle (ENG)</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00000066]" />
                                                    <input type="text" name="professionEn" placeholder="e.g. Senior Consultant..." defaultValue={editingTestimonial?.profession.en} className="w-full pl-11 pr-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">اسم المشارك (AR)</label>
                                                <input type="text" dir="rtl" name="nameAr" placeholder="الاسم الكامل..." defaultValue={editingTestimonial?.name.ar} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">المهنة / المسمى الوظيفي (AR)</label>
                                                <input type="text" dir="rtl" name="professionAr" placeholder="مثال: استشاري أول..." defaultValue={editingTestimonial?.profession.ar} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Media Section (Improved) */}
                                <div className="space-y-4 border-t border-border-stroke pt-4">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest border-l-4 border-brand-blue pl-3">
                                        Media (Photos & Logos)
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F7FAF9] p-6 rounded-2xl border border-border-stroke">
                                        {/* Company Logo */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider">Company Logo (ENG)</label>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider text-right">شعار الشركة (AR)</label>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-border-stroke flex items-center justify-center shrink-0 overflow-hidden group/logo relative shadow-sm">
                                                    {logoPreview ? (
                                                        <img src={logoPreview} alt="Preview" className="w-full h-full object-contain p-2" />
                                                    ) : (
                                                        <ImageIcon className="w-8 h-8 text-[#00000033]" />
                                                    )}
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        onChange={handleLogoUpload}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                </div>
                                                <div className="space-y-3 flex-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="w-full px-4 py-2.5 bg-white border border-border-stroke rounded-xl text-xs font-bold text-black hover:bg-[#F7FAF9] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                                                    >
                                                        <ImageIcon className="w-4 h-4" />
                                                        {logoPreview ? "Change Logo" : "Upload Logo"}
                                                    </button>
                                                    <p className="text-[10px] text-[#00000066] leading-relaxed">Recommended: Square PNG with transparent background (Max 2MB)</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Participant Photo */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider">Participant Photo (ENG)</label>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider text-right">صورة المشارك (AR)</label>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-border-stroke flex items-center justify-center shrink-0 overflow-hidden group/photo relative shadow-sm">
                                                    {imagePreview ? (
                                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="w-8 h-8 text-[#00000033]" />
                                                    )}
                                                    <input
                                                        type="file"
                                                        ref={imageInputRef}
                                                        onChange={handleImageUpload}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                </div>
                                                <div className="space-y-3 flex-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => imageInputRef.current?.click()}
                                                        className="w-full px-4 py-2.5 bg-white border border-border-stroke rounded-xl text-xs font-bold text-black hover:bg-[#F7FAF9] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                                                    >
                                                        <ImageIcon className="w-4 h-4" />
                                                        {imagePreview ? "Change Photo" : "Upload Photo"}
                                                    </button>
                                                    <p className="text-[10px] text-[#00000066] leading-relaxed">Recommended: High quality portrait photo (Max 2MB)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Date Section */}
                                <div className="space-y-4 border-t border-border-stroke pt-4">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest border-l-4 border-brand-blue pl-3">
                                        Status & Date
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            {/* Graduate Date (EN) */}
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Graduate Date (ENG)</label>
                                                <input type="text" name="dateEn" placeholder="e.g. Oct 2023" defaultValue={editingTestimonial?.graduateDate.en} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm" required />
                                            </div>
                                            {/* Status (EN) */}
                                            <div className="relative">
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Publishing Status (ENG)</label>
                                                <button type="button" onClick={(e) => { e.stopPropagation(); setStatusDropdownOpenEn(!statusDropdownOpenEn); setStatusDropdownOpenAr(false); }} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] flex items-center justify-between text-sm text-black focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all">
                                                    <span className="capitalize">{selectedStatusEn}</span>
                                                    <ChevronDown className={`w-4 h-4 text-[#00000066] transition-transform duration-200 ${statusDropdownOpenEn ? "rotate-180" : ""}`} />
                                                </button>
                                                {statusDropdownOpenEn && (
                                                    <div className="absolute z-[110] bottom-full mb-2 left-0 w-full bg-white rounded-2xl border border-border-stroke shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                        {["active", "inactive"].map((s) => (
                                                            <button key={s} type="button" onClick={() => { setSelectedStatusEn(s as any); setStatusDropdownOpenEn(false); }} className={`w-full px-4 py-3 text-left text-sm hover:bg-brand-blue/5 transition-colors flex items-center gap-2 ${selectedStatusEn === s ? "bg-brand-blue/5 text-brand-blue font-bold" : "text-[#00000099]"}`}>
                                                                <div className={`w-2 h-2 rounded-full ${s === "active" ? "bg-[#019977]" : "bg-red-600"}`} />
                                                                {s.charAt(0).toUpperCase() + s.slice(1)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Graduate Date (AR) */}
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">تاريخ التخرج (AR)</label>
                                                <input type="text" dir="rtl" name="dateAr" placeholder="مثال: أكتوبر 2023" defaultValue={editingTestimonial?.graduateDate.ar} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm" required />
                                            </div>
                                            {/* Status (AR) */}
                                            <div className="relative">
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">حالة النشر (AR)</label>
                                                <button type="button" dir="rtl" onClick={(e) => { e.stopPropagation(); setStatusDropdownOpenAr(!statusDropdownOpenAr); setStatusDropdownOpenEn(false); }} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] flex items-center justify-between text-sm text-black focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all">
                                                    <span className="capitalize">{selectedStatusAr === "active" ? "نشط" : "غير نشط"}</span>
                                                    <ChevronDown className={`w-4 h-4 text-[#00000066] transition-transform duration-200 ${statusDropdownOpenAr ? "rotate-180" : ""}`} />
                                                </button>
                                                {statusDropdownOpenAr && (
                                                    <div className="absolute z-[110] bottom-full mb-2 left-0 w-full bg-white rounded-2xl border border-border-stroke shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                        {[
                                                            { val: "active", lab: "نشط (Active)" },
                                                            { val: "inactive", lab: "غير نشط (Inactive)" }
                                                        ].map((s) => (
                                                            <button key={s.val} type="button" onClick={() => { setSelectedStatusAr(s.val as any); setStatusDropdownOpenAr(false); }} className={`w-full px-4 py-3 text-right text-sm hover:bg-brand-blue/5 transition-colors flex items-center justify-start gap-2 flex-row-reverse ${selectedStatusAr === s.val ? "bg-brand-blue/5 text-brand-blue font-bold" : "text-[#00000099]"}`}>
                                                                <div className={`w-2 h-2 rounded-full ${s.val === "active" ? "bg-[#019977]" : "bg-red-600"}`} />
                                                                {s.lab}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="space-y-4 border-t border-border-stroke pt-4">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest border-l-4 border-brand-blue pl-3">
                                        Testimonial Content
                                    </h4>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Description / Experience (ENG)</label>
                                            <textarea rows={4} name="descEn" placeholder="What did they say about the program?" defaultValue={editingTestimonial?.description.en} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">الوصف / التجربة (AR)</label>
                                            <textarea rows={4} dir="rtl" name="descAr" placeholder="ماذا قالوا عن البرنامج؟" defaultValue={editingTestimonial?.description.ar} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none" required />
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements Section */}
                                <div className="space-y-6 pt-4 border-t border-border-stroke">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest border-l-4 border-brand-blue pl-3">
                                        Key Achievements (Three Slots)
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[0, 1, 2].map((idx) => (
                                            <div key={idx} className="p-5 rounded-2xl border border-dashed border-brand-blue/30 bg-brand-blue/5 space-y-4 hover:bg-brand-blue/10 transition-colors">
                                                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase">
                                                    <Award className="w-4 h-4" /> Achievement {idx + 1}
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <input type="text" name={`achievement_val_en_${idx}`} placeholder="Val (EN)" defaultValue={editingTestimonial?.achievements[idx]?.value.en} className="w-full px-3 py-2 text-xs rounded-lg border border-border-stroke bg-white focus:ring-1 focus:ring-brand-blue" required />
                                                        <input type="text" dir="rtl" name={`achievement_val_ar_${idx}`} placeholder="القيمة (AR)" defaultValue={editingTestimonial?.achievements[idx]?.value.ar} className="w-full px-3 py-2 text-xs rounded-lg border border-border-stroke bg-white focus:ring-1 focus:ring-brand-blue" required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <input type="text" name={`achievement_lbl_en_${idx}`} placeholder="Label (EN)" defaultValue={editingTestimonial?.achievements[idx]?.label.en} className="w-full px-3 py-2 text-xs rounded-lg border border-border-stroke bg-white focus:ring-1 focus:ring-brand-blue" required />
                                                        <input type="text" dir="rtl" name={`achievement_lbl_ar_${idx}`} placeholder="التسمية (AR)" defaultValue={editingTestimonial?.achievements[idx]?.label.ar} className="w-full px-3 py-2 text-xs rounded-lg border border-border-stroke bg-white focus:ring-1 focus:ring-brand-blue" required />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-8 border-t border-border-stroke shrink-0">
                                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isLoading} className="flex-1 cursor-pointer py-4 text-sm font-bold text-[#00000099] hover:bg-black/5 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-border-stroke">Cancel</button>
                                <button type="submit" disabled={isLoading} className="flex-[2] cursor-pointer py-4 bg-brand-gradient text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all font-outfit disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                    {isLoading ? (editingTestimonial ? "Updating..." : "Creating...") : (editingTestimonial ? "Update Testimonial" : "Save Testimonial")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeletingId(null);
                }}
                onConfirm={deleteTestimonial}
                title="Delete Testimonial"
                message="Are you sure you want to delete this testimonial? This action cannot be undone."
                isLoading={isLoading}
            />
        </div>
    );
}
