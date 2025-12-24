"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Plus, ChevronLeft, ChevronRight, Edit2, Trash2, Calendar, Clock, CheckCircle, XCircle, ChevronDown } from "lucide-react";
import clientApi from "@/lib/clientApi";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

interface NewsItem {
    id: string;
    topic: {
        en: string;
        ar: string;
    };
    content: {
        en: string;
        ar: string;
    };
    status: {
        en: "active" | "inactive";
        ar: "active" | "inactive";
    };
    expiryDate: {
        en: string;
        ar: string;
    };
    applyNowUrl: {
        en: string;
        ar: string;
    };
    createdAt: string;
}

export default function NewsPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = useState<any>(null);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
    const [statusDropdownOpenEn, setStatusDropdownOpenEn] = useState(false);
    const [statusDropdownOpenAr, setStatusDropdownOpenAr] = useState(false);
    const [selectedStatusEn, setSelectedStatusEn] = useState<"active" | "inactive">("active");
    const [selectedStatusAr, setSelectedStatusAr] = useState<"active" | "inactive">("active");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionId, setActionId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const itemsPerPage = 10;

    const fetchNews = async () => {
        try {
            const response = await clientApi.get("/api/news");
            setNews(response.data);
        } catch {
            toast.error("Failed to fetch news");
        }
    };

    useEffect(() => {
        const initData = () => {
            getDictionary(lang).then(setDict);
            void fetchNews();
        };
        initData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    if (!dict) return null;

    const totalPages = Math.ceil(news.length / itemsPerPage);
    const currentNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const toggleStatus = async (id: string, currentStatus: any) => {
        setActionId(id);
        setIsSubmitting(true);
        try {
            const newStatusEn = currentStatus.en === "active" ? "inactive" : "active";
            const newStatusAr = currentStatus.ar === "active" ? "inactive" : "active";

            await clientApi.put(`/api/news/${id}`, {
                status: {
                    en: newStatusEn,
                    ar: newStatusAr
                }
            });
            await fetchNews();
            toast.success("Status updated successfully");
        } catch {
            toast.error("Failed to update status");
        } finally {
            setIsSubmitting(false);
            setActionId(null);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeletingId(id);
        setIsDeleteModalOpen(true);
    };

    const deleteNews = async () => {
        if (!deletingId) return;
        setIsSubmitting(true);
        try {
            await clientApi.delete(`/api/news/${deletingId}`);
            await fetchNews();
            toast.success("News deleted successfully");
            setIsDeleteModalOpen(false);
        } catch {
            toast.error("Failed to delete news");
        } finally {
            setIsSubmitting(false);
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-8 pb-10  text-[#00000099] animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-black tracking-tight flex items-center gap-2">
                        {dict.dashboard.sidebar.news}
                    </h1>
                    <p className="text-[#00000099] text-sm mt-1">
                        {dict.dashboard.news.subtitle}
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingNews(null);
                        setSelectedStatusEn("active");
                        setSelectedStatusAr("active");
                        setIsModalOpen(true);
                        setStatusDropdownOpenEn(false);
                        setStatusDropdownOpenAr(false);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all group"
                >
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    {dict.dashboard.news.addBtn}
                </button>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-2xl border border-border-stroke overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F7FAF9] border-b border-border-stroke">
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">{dict.dashboard.news.table.topic}</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">{dict.dashboard.news.table.status}</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">{dict.dashboard.news.table.expiry}</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">{dict.dashboard.news.table.created}</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap text-right">{dict.dashboard.news.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-stroke">
                            {currentNews.map((item) => (
                                <tr key={item.id} className="group hover:bg-[#F7FAF9]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-black line-clamp-1">
                                                {lang === 'ar' ? item.topic.ar : item.topic.en}
                                            </p>
                                            <p className="text-xs text-[#00000099] line-clamp-1">
                                                {lang === 'ar' ? item.content.ar : item.content.en}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(item.id, item.status)}
                                            disabled={isSubmitting && actionId === item.id}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all disabled:opacity-50
                                                ${item.status[lang] === "active"
                                                    ? "bg-[#E6F4F1] text-[#019977] hover:bg-[#019977] hover:text-white"
                                                    : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"}`}
                                        >
                                            {isSubmitting && actionId === item.id ? (
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
                                            {lang === 'ar' ? item.expiryDate.ar : item.expiryDate.en}
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
                                                    setEditingNews(item);
                                                    setSelectedStatusEn(item.status.en);
                                                    setSelectedStatusAr(item.status.ar);
                                                    setIsModalOpen(true);
                                                    setStatusDropdownOpenEn(false);
                                                    setStatusDropdownOpenAr(false);
                                                }}
                                                className="p-2 text-[#00000066] hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(item.id)}
                                                disabled={isSubmitting && actionId === item.id}
                                                className="p-2 text-[#00000066] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
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
                        Showing <span className="text-black">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-black">{Math.min(currentPage * itemsPerPage, news.length)}</span> of <span className="text-black">{news.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="p-2 border border-border-stroke rounded-lg disabled:opacity-30 hover:bg-white transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all
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
                            className="p-2 border border-border-stroke rounded-lg disabled:opacity-30 hover:bg-white transition-all"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed  inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 max-h-[96vh]">
                        <div className="p-8 border-b border-border-stroke flex items-center justify-between bg-[#F7FAF9] shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-black">{editingNews ? dict.dashboard.news.editBtn : dict.dashboard.news.addBtn}</h3>
                                <p className="text-[#00000099] text-xs mt-1">{dict.dashboard.news.subtitle}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full text-[#00000066] transition-colors">
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <form className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6" onSubmit={async (e) => {
                            e.preventDefault();
                            if (isSubmitting) return;
                            setIsSubmitting(true);
                            const formData = new FormData(e.currentTarget);

                            const payload = {
                                topic: {
                                    en: formData.get('topicEn'),
                                    ar: formData.get('topicAr')
                                },
                                content: {
                                    en: formData.get('contentEn'),
                                    ar: formData.get('contentAr')
                                },
                                status: {
                                    en: selectedStatusEn,
                                    ar: selectedStatusAr
                                },
                                expiryDate: {
                                    en: formData.get('expiryEn'),
                                    ar: formData.get('expiryAr')
                                },
                                applyNowUrl: {
                                    en: formData.get('applyUrlEn'),
                                    ar: formData.get('applyUrlAr')
                                }
                            };

                            try {
                                if (editingNews) {
                                    await clientApi.put(`/api/news/${editingNews.id}`, payload);
                                    toast.success("News updated successfully");
                                } else {
                                    await clientApi.post("/api/news", payload);
                                    toast.success("News created successfully");
                                }
                                setIsModalOpen(false);
                                fetchNews();
                            } catch {
                                toast.error("Failed to save news");
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}>
                            <div className="space-y-6">
                                {/* Topic Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">{dict.dashboard.news.form.topicEn}</label>
                                        <input
                                            type="text"
                                            name="topicEn"
                                            placeholder="Enter English topic..."
                                            defaultValue={editingNews?.topic.en}
                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">{dict.dashboard.news.form.topicAr}</label>
                                        <input
                                            type="text"
                                            dir="rtl"
                                            name="topicAr"
                                            placeholder="أدخل الموضوع بالعربية..."
                                            defaultValue={editingNews?.topic.ar}
                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Content Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">{dict.dashboard.news.form.contentEn}</label>
                                        <textarea
                                            rows={3}
                                            name="contentEn"
                                            placeholder="Enter English content..."
                                            defaultValue={editingNews?.content.en}
                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">{dict.dashboard.news.form.contentAr}</label>
                                        <textarea
                                            rows={3}
                                            dir="rtl"
                                            name="contentAr"
                                            placeholder="أدخل المحتوى بالعربية..."
                                            defaultValue={editingNews?.content.ar}
                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="relative">
                                        <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Status (ENG)</label>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setStatusDropdownOpenEn(!statusDropdownOpenEn);
                                                setStatusDropdownOpenAr(false);
                                            }}
                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] flex items-center justify-between text-sm text-black focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                        >
                                            <span className="capitalize">{selectedStatusEn}</span>
                                            <ChevronDown className={`w-4 h-4 text-[#00000066] transition-transform duration-200 ${statusDropdownOpenEn ? "rotate-180" : ""}`} />
                                        </button>

                                        {statusDropdownOpenEn && (
                                            <div className="absolute z-[110] bottom-full mb-2 left-0 w-full bg-white rounded-2xl border border-border-stroke shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedStatusEn("active");
                                                        setStatusDropdownOpenEn(false);
                                                    }}
                                                    className={`w-full px-4 py-3 text-left text-sm hover:bg-brand-blue/5 transition-colors flex items-center gap-2
                                                        ${selectedStatusEn === "active" ? "bg-brand-blue/5 text-brand-blue font-bold" : "text-[#00000099]"}`}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-[#019977]" />
                                                    Active
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedStatusEn("inactive");
                                                        setStatusDropdownOpenEn(false);
                                                    }}
                                                    className={`w-full px-4 py-3 text-left text-sm hover:bg-red-50 transition-colors flex items-center gap-2
                                                        ${selectedStatusEn === "inactive" ? "bg-red-50 text-red-600 font-bold" : "text-[#00000099]"}`}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-red-600" />
                                                    Inactive
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">الحالة (AR)</label>
                                        <button
                                            type="button"
                                            dir="rtl"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setStatusDropdownOpenAr(!statusDropdownOpenAr);
                                                setStatusDropdownOpenEn(false);
                                            }}
                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] flex items-center justify-between text-sm text-black focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                        >
                                            <span className="capitalize">{selectedStatusAr === "active" ? "نشط" : "غير نشط"}</span>
                                            <ChevronDown className={`w-4 h-4 text-[#00000066] transition-transform duration-200 ${statusDropdownOpenAr ? "rotate-180" : ""}`} />
                                        </button>

                                        {statusDropdownOpenAr && (
                                            <div className="absolute z-[110] bottom-full mb-2 left-0 w-full bg-white rounded-2xl border border-border-stroke shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedStatusAr("active");
                                                        setStatusDropdownOpenAr(false);
                                                    }}
                                                    className={`w-full px-4 py-3 text-right text-sm hover:bg-brand-blue/5 transition-colors flex items-center justify-start gap-2 flex-row-reverse
                                                        ${selectedStatusAr === "active" ? "bg-brand-blue/5 text-brand-blue font-bold" : "text-[#00000099]"}`}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-[#019977]" />
                                                    نشط (Active)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedStatusAr("inactive");
                                                        setStatusDropdownOpenAr(false);
                                                    }}
                                                    className={`w-full px-4 py-3 text-right text-sm hover:bg-red-50 transition-colors flex items-center justify-start gap-2 flex-row-reverse
                                                        ${selectedStatusAr === "inactive" ? "bg-red-50 text-red-600 font-bold" : "text-[#00000099]"}`}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-red-600" />
                                                    غير نشط (Inactive)
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">{dict.dashboard.news.form.expiryEn}</label>
                                            <input
                                                type="date"
                                                name="expiryEn"
                                                defaultValue={editingNews?.expiryDate.en}
                                                className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">{dict.dashboard.news.form.expiryAr}</label>
                                            <input
                                                type="date"
                                                dir="rtl"
                                                name="expiryAr"
                                                defaultValue={editingNews?.expiryDate.ar}
                                                className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">{dict.dashboard.news.form.applyUrlEn}</label>
                                            <input
                                                type="url"
                                                name="applyUrlEn"
                                                placeholder="https://example.com/apply"
                                                defaultValue={editingNews?.applyNowUrl?.en}
                                                className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">{dict.dashboard.news.form.applyUrlAr}</label>
                                            <input
                                                type="url"
                                                dir="rtl"
                                                name="applyUrlAr"
                                                placeholder="https://example.com/apply"
                                                defaultValue={editingNews?.applyNowUrl?.ar}
                                                className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-border-stroke">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isSubmitting}
                                    className="flex-1 cursor-pointer py-4 text-sm font-bold text-[#00000099] hover:bg-black/5 rounded-2xl transition-all disabled:opacity-50"
                                >
                                    {dict.dashboard.news.form.cancel}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] cursor-pointer py-4 bg-brand-gradient text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                    {isSubmitting ? (editingNews ? "Updating..." : "Creating...") : (editingNews ? dict.dashboard.news.updateBtn : dict.dashboard.news.createBtn)}
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
                onConfirm={deleteNews}
                title="Delete News"
                message="Are you sure you want to delete this news item? This action cannot be undone."
                isLoading={isSubmitting}
            />
        </div>
    );
}
