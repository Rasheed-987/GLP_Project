"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Locale } from "../../../../lib/i18n/config";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import { Plus, Edit2, Trash2, Calendar, Clock, CheckCircle, XCircle, ChevronDown, Image as ImageIcon, Type, AlignLeft, FileText, X } from "lucide-react";
import Image from "next/image";
import clientApi from "../../../../lib/clientApi";
import { toast } from "react-hot-toast";
import DatePicker from "../../../../app/components/DatePicker";
import DeleteConfirmationModal from "../../../../components/DeleteConfirmationModal";
import LoadingScreen from "../../../../components/LoadingScreen";
import { useArticles } from "../../../../hooks/useDashboard";

interface ContentSection {
    id: string;
    heading: {
        en: string;
        ar: string;
    };
    content: {
        en: string;
        ar: string;
    };
}

interface ArticleItem {
    id: string;
    title: {
        en: string;
        ar: string;
    };
    subtitle: {
        en: string;
        ar: string;
    };
    date: {
        en: string;
        ar: string;
    };
    mainImage: string;
    sections: ContentSection[];
    status: {
        en: "active" | "inactive";
        ar: "active" | "inactive";
    };
    createdAt: string;
}

// Mock data removed

export default function ArticlesPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = useState<any>(null);

    // React Query Hook
    const { data: articles = [], isLoading: articlesLoading, refetch: fetchArticles } = useArticles(lang);

    const [currentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

    // Form state
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [sections, setSections] = useState<ContentSection[]>([]);
    const [statusDropdownOpenEn, setStatusDropdownOpenEn] = useState(false);
    const [statusDropdownOpenAr, setStatusDropdownOpenAr] = useState(false);
    const [selectedStatusEn, setSelectedStatusEn] = useState<"active" | "inactive">("active");
    const [selectedStatusAr, setSelectedStatusAr] = useState<"active" | "inactive">("active");
    const [dateEn, setDateEn] = useState("");
    const [dateAr, setDateAr] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionId, setActionId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const itemsPerPage = 8;

    useEffect(() => {
        getDictionary(lang).then(setDict);
    }, [lang]);

    // Initialize sections and expanded state when modal opens
    useEffect(() => {
        if (isModalOpen) {
            if (editingArticle) {
                setSections(editingArticle.sections);
                if (editingArticle.sections.length > 0) {
                    setExpandedSectionId(editingArticle.sections[0].id);
                }
            } else {
                // For new articles, start with one empty expanded section
                const firstId = Date.now().toString();
                setSections([{ id: firstId, heading: { en: "", ar: "" }, content: { en: "", ar: "" } }]);
                setExpandedSectionId(firstId);
            }
        }
    }, [isModalOpen, editingArticle]);

    if (articlesLoading || !dict) return <LoadingScreen />;

    const currentArticles = articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Featured image must be smaller than 2MB");
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const addSection = () => {
        const newId = Date.now().toString();
        setSections([...sections, { id: newId, heading: { en: "", ar: "" }, content: { en: "", ar: "" } }]);
        setExpandedSectionId(newId); // Expand the new section
    };

    const removeSection = (id: string) => {
        setSections(sections.filter(s => s.id !== id));
    };

    const updateSection = (id: string, field: 'heading' | 'content', l: 'en' | 'ar', val: string) => {
        setSections(sections.map(s => {
            if (s.id === id) {
                return { ...s, [field]: { ...s[field], [l]: val } };
            }
            return s;
        }));
    };

    const toggleStatus = async (id: string, currentStatus: any) => {
        setActionId(id);
        setIsSubmitting(true);
        try {
            const newStatusEn = currentStatus.en === "active" ? "inactive" : "active";
            const newStatusAr = currentStatus.ar === "active" ? "inactive" : "active";

            await clientApi.put(`/api/articles/${id}`, {
                status: {
                    en: newStatusEn,
                    ar: newStatusAr
                }
            });
            await fetchArticles();
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

    const deleteArticle = async () => {
        if (!deletingId) return;
        setIsSubmitting(true);
        try {
            await clientApi.delete(`/api/articles/${deletingId}`);
            await fetchArticles();
            toast.success("Article deleted successfully");
            setIsDeleteModalOpen(false);
        } catch {
            toast.error("Failed to delete article");
        } finally {
            setIsSubmitting(false);
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-8 pb-10 text-[#00000099] animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-black tracking-tight flex items-center gap-2">
                        {dict.dashboard.sidebar.articles}
                    </h1>
                    <p className="text-[#00000099] text-sm mt-1">
                        Publish insights and leadership stories.
                    </p>
                </div>
                <button
                    disabled={isSubmitting}
                    onClick={() => {
                        setEditingArticle(null);
                        setImagePreview(null);
                        setImageFile(null);
                        setSelectedStatusEn("active");
                        setSelectedStatusAr("active");
                        setDateEn("");
                        setDateAr("");
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    Create New Article
                </button>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-2xl border border-border-stroke overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F7FAF9] border-b border-border-stroke">
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">Article</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">Article Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap">Created</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#00000066] uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-stroke">
                            {currentArticles.map((item: ArticleItem) => (
                                <tr key={item.id} className="group hover:bg-[#F7FAF9]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-brand-blue/5 border border-border-stroke flex items-center justify-center shrink-0 overflow-hidden">
                                                {item.mainImage ? (
                                                    <Image src={item.mainImage} alt="Main" width={48} height={48} className="w-full h-full object-cover" />
                                                ) : (
                                                    <FileText className="w-5 h-5 text-brand-blue" />
                                                )}
                                            </div>
                                            <div className="space-y-0.5 max-w-sm">
                                                <p className="text-sm font-bold text-black line-clamp-1">
                                                    {lang === 'ar' ? item.title.ar : item.title.en}
                                                </p>
                                                <p className="text-[11px] text-[#00000099] line-clamp-1">
                                                    {lang === 'ar' ? item.subtitle.ar : item.subtitle.en}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(item.id, item.status)}
                                            disabled={isSubmitting}
                                            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed
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
                                            {lang === 'ar' ? item.date.ar : item.date.en}
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
                                                    setEditingArticle(item);
                                                    setImagePreview(item.mainImage);
                                                    setImageFile(null);
                                                    setSelectedStatusEn(item.status.en);
                                                    setSelectedStatusAr(item.status.ar);
                                                    setDateEn(item.date.en);
                                                    setDateAr(item.date.ar);
                                                    setIsModalOpen(true);
                                                }}
                                                disabled={isSubmitting}
                                                className="p-2 text-[#00000066] hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(item.id)}
                                                disabled={isSubmitting}
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

                {/* Pagination (Simplified for now) */}
                <div className="px-6 py-4 bg-[#F7FAF9] border-t border-border-stroke flex items-center justify-between">
                    <p className="text-xs text-[#00000066] font-medium">
                        Showing results for {dict.dashboard.sidebar.articles}
                    </p>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 max-h-[96vh]">
                        <div className="p-8 border-b border-border-stroke flex items-center justify-between bg-[#F7FAF9] shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-black">{editingArticle ? "Edit Article" : "Create New Article"}</h3>
                                <p className="text-[#00000099] text-xs mt-1">Publish bilingual leadership content and insights.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full text-[#00000066] transition-colors cursor-pointer">
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <form className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10" onSubmit={async (e) => {
                            e.preventDefault();
                            if (isSubmitting) return;
                            setIsSubmitting(true);
                            const formData = new FormData(e.currentTarget);

                            try {
                                const titleEn = (formData.get('titleEn') as string || "").trim();
                                const titleAr = (formData.get('titleAr') as string || "").trim();
                                const subtitleEn = (formData.get('subtitleEn') as string || "").trim();
                                const subtitleAr = (formData.get('subtitleAr') as string || "").trim();

                                // Basic Empty Checks
                                if (!titleEn || !titleAr || !subtitleEn || !subtitleAr || !dateEn || !dateAr) {
                                    toast.error("Please fill in all required fields");
                                    setIsSubmitting(false);
                                    return;
                                }

                                // Length Validations
                                if (titleEn.length < 3 || titleEn.length > 100 || titleAr.length < 3 || titleAr.length > 100) {
                                    toast.error("Title must be between 3 and 100 characters");
                                    setIsSubmitting(false);
                                    return;
                                }
                                if (subtitleEn.length < 10 || subtitleEn.length > 250 || subtitleAr.length < 10 || subtitleAr.length > 250) {
                                    toast.error("Subtitle must be between 10 and 250 characters");
                                    setIsSubmitting(false);
                                    return;
                                }

                                // Media Checks (for new articles)
                                if (!editingArticle && !imageFile) {
                                    toast.error("Featured image is required");
                                    setIsSubmitting(false);
                                    return;
                                }

                                // Sections Validation
                                if (sections.length === 0) {
                                    toast.error("At least one content section is required");
                                    setIsSubmitting(false);
                                    return;
                                }

                                const validatedSections = sections.map((s, idx) => {
                                    const hEn = (s.heading.en || "").trim();
                                    const hAr = (s.heading.ar || "").trim();
                                    const cEn = (s.content.en || "").trim();
                                    const cAr = (s.content.ar || "").trim();

                                    if (!cEn || !cAr) {
                                        throw new Error(`Section ${idx + 1} content is required in both languages`);
                                    }
                                    if (cEn.length < 20 || cEn.length > 5000 || cAr.length < 20 || cAr.length > 5000) {
                                        throw new Error(`Section ${idx + 1} content must be between 20 and 5000 characters`);
                                    }
                                    if ((hEn && (hEn.length < 3 || hEn.length > 100)) || (hAr && (hAr.length < 3 || hAr.length > 100))) {
                                        throw new Error(`Section ${idx + 1} heading must be between 3 and 100 characters`);
                                    }

                                    return {
                                        ...s,
                                        heading: { en: hEn, ar: hAr },
                                        content: { en: cEn, ar: cAr }
                                    };
                                });

                                const formDataSubmit = new FormData();
                                formDataSubmit.append('titleEn', titleEn);
                                formDataSubmit.append('titleAr', titleAr);
                                formDataSubmit.append('subtitleEn', subtitleEn);
                                formDataSubmit.append('subtitleAr', subtitleAr);
                                formDataSubmit.append('dateEn', dateEn);
                                formDataSubmit.append('dateAr', dateAr);
                                formDataSubmit.append('sections', JSON.stringify(validatedSections));
                                formDataSubmit.append('statusEn', selectedStatusEn);
                                formDataSubmit.append('statusAr', selectedStatusAr);

                                if (imageFile) {
                                    formDataSubmit.append('mainImage', imageFile);
                                } else if (editingArticle) {
                                    formDataSubmit.append('mainImage', editingArticle.mainImage);
                                }

                                if (editingArticle) {
                                    await clientApi.put(`/api/articles/${editingArticle.id}`, formDataSubmit, {
                                        headers: { 'Content-Type': 'multipart/form-data' }
                                    });
                                    toast.success("Article updated successfully");
                                } else {
                                    await clientApi.post("/api/articles", formDataSubmit, {
                                        headers: { 'Content-Type': 'multipart/form-data' }
                                    });
                                    toast.success("Article published successfully");
                                }
                                setIsModalOpen(false);
                                fetchArticles();
                            } catch (err: any) {
                                toast.error(err.message || "Failed to save article");
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}>
                            <div className="space-y-10">
                                {/* Article Metadata */}
                                <div className="space-y-6">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest border-l-4 border-brand-blue pl-3">
                                        Article Logistics
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <DatePicker
                                                label="Article Date (ENG)"
                                                value={dateEn}
                                                onChange={setDateEn}
                                                lang="en"
                                                placeholder="e.g. 07.04.2025"
                                            />
                                            <div className="relative">
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Published Status (ENG)</label>
                                                <button type="button" onClick={() => { setStatusDropdownOpenEn(!statusDropdownOpenEn); setStatusDropdownOpenAr(false); }} className="cursor-pointer w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] flex items-center justify-between text-sm text-black">
                                                    <span className="capitalize">{selectedStatusEn}</span>
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${statusDropdownOpenEn ? "rotate-180" : ""}`} />
                                                </button>
                                                {statusDropdownOpenEn && (
                                                    <div className="absolute z-[110] bottom-full mb-2 left-0 w-full bg-white rounded-2xl border border-border-stroke shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                        {["active", "inactive"].map(s => (
                                                            <button key={s} type="button" onClick={() => { setSelectedStatusEn(s as any); setStatusDropdownOpenEn(false); }} className={`cursor-pointer w-full px-4 py-3 text-left hover:bg-black/5 text-sm capitalize ${selectedStatusEn === s ? "bg-brand-blue/5 text-brand-blue font-bold" : "text-[#00000099]"}`}>{s}</button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <DatePicker
                                                label="تاريخ المقال (AR)"
                                                value={dateAr}
                                                onChange={setDateAr}
                                                lang="ar"
                                                dir="rtl"
                                                placeholder="مثال: ٠٧.٠٤.٢٠٢٥"
                                            />
                                            <div className="relative">
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">حالة النشر (AR)</label>
                                                <button type="button" dir="rtl" onClick={() => { setStatusDropdownOpenAr(!statusDropdownOpenAr); setStatusDropdownOpenEn(false); }} className="cursor-pointer w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] flex items-center justify-between text-sm text-black">
                                                    <span className="capitalize">{selectedStatusAr === "active" ? "نشط" : "غير نشط"}</span>
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${statusDropdownOpenAr ? "rotate-180" : ""}`} />
                                                </button>
                                                {statusDropdownOpenAr && (
                                                    <div className="absolute z-[110] bottom-full mb-2 left-0 w-full bg-white rounded-2xl border border-border-stroke shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                        {[
                                                            { val: "active", lab: "نشط (Active)" },
                                                            { val: "inactive", lab: "غير نشط (Inactive)" }
                                                        ].map(s => (
                                                            <button key={s.val} type="button" onClick={() => { setSelectedStatusAr(s.val as any); setStatusDropdownOpenAr(false); }} className={`cursor-pointer w-full px-4 py-3 text-right hover:bg-black/5 text-sm ${selectedStatusAr === s.val ? "bg-brand-blue/5 text-brand-blue font-bold" : "text-[#00000099]"}`}>{s.lab}</button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Title & Subtitle */}
                                <div className="space-y-6">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest border-l-4 border-brand-blue pl-3">
                                        Headlines
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Title (ENG)</label>
                                                <input type="text" name="titleEn" placeholder="Article Headline..." defaultValue={editingArticle?.title.en} minLength={3} maxLength={100} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2">Subtitle (ENG)</label>
                                                <textarea rows={2} name="subtitleEn" placeholder="Brief summary..." defaultValue={editingArticle?.subtitle.en} minLength={10} maxLength={250} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none" required />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">العنوان (AR)</label>
                                                <input type="text" dir="rtl" name="titleAr" placeholder="عنوان المقال..." defaultValue={editingArticle?.title.ar} minLength={3} maxLength={100} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">عنوان فرعي (AR)</label>
                                                <textarea rows={2} dir="rtl" name="subtitleAr" placeholder="ملخص قصير..." defaultValue={editingArticle?.subtitle.ar} minLength={10} maxLength={250} className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Image */}
                                <div className="space-y-4">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-black uppercase tracking-widest border-l-4 border-brand-blue pl-3">
                                        Main Featured Image
                                    </h4>
                                    <div className="relative group">
                                        <div className={`w-full aspect-[21/9] rounded-3xl border-2 border-dashed border-border-stroke bg-[#F7FAF9] flex flex-col items-center justify-center overflow-hidden transition-all ${!imagePreview ? "hover:border-brand-blue/50" : ""}`}>
                                            {imagePreview ? (
                                                <>
                                                    <Image src={imagePreview} alt="Preview" width={800} height={400} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="cursor-pointer bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2">
                                                            <ImageIcon className="w-4 h-4" /> Change Image
                                                        </button>
                                                        <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Max 2MB</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <button type="button" onClick={() => fileInputRef.current?.click()} className="cursor-pointer flex flex-col items-center gap-3 text-[#00000033]">
                                                    <ImageIcon className="w-12 h-12" />
                                                    <div className="flex flex-col items-center gap-1">
                                                        <span className="text-sm font-bold">Click to upload featured image</span>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">(21:9 Aspect Recommended • Max 2MB)</span>
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                                    </div>
                                </div>

                                {/* Dynamic Content Sections */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-l-4 border-brand-blue pl-3">
                                        <h4 className="text-sm font-bold text-black uppercase tracking-widest">
                                            Content Sections (Headings & Paragraphs)
                                        </h4>
                                        <button type="button" onClick={addSection} className="cursor-pointer flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-blue/80 transition-all">
                                            <Plus className="w-4 h-4" /> Add Section
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {sections.map((section, index) => {
                                            const isExpanded = expandedSectionId === section.id;
                                            return (
                                                <div key={section.id} className={`relative rounded-3xl border transition-all duration-300 ${isExpanded ? "bg-[#F7FAF9] border-brand-blue shadow-sm" : "bg-white border-border-stroke hover:border-brand-blue/30"}`}>
                                                    {/* Accordion Header */}
                                                    <div
                                                        onClick={() => setExpandedSectionId(isExpanded ? null : section.id)}
                                                        className="flex items-center justify-between p-6 cursor-pointer select-none"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <span className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${isExpanded ? "bg-brand-blue text-white" : "bg-brand-blue/10 text-brand-blue"}`}>
                                                                {index + 1}
                                                            </span>
                                                            <div className="space-y-0.5">
                                                                <h5 className={`text-sm font-bold transition-colors ${isExpanded ? "text-brand-blue" : "text-black"}`}>
                                                                    {section.heading.en || (lang === 'ar' ? (section.heading.ar || "قسم جديد") : "Untitled Section")}
                                                                </h5>
                                                                <p className="text-[11px] text-[#00000066] uppercase tracking-widest font-bold">Content Section</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                                                                className="p-2 text-[#00000033] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                                title="Delete Section"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                            <ChevronDown className={`w-5 h-5 text-[#00000033] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                                                        </div>
                                                    </div>

                                                    {/* Accordion Content */}
                                                    {isExpanded && (
                                                        <div className="p-8 pt-0 space-y-8 animate-in slide-in-from-top-4 duration-300 border-t border-brand-blue/5 mt-2">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                                                <div className="space-y-6">
                                                                    <div>
                                                                        <label className="flex items-center gap-2 text-[10px] font-bold text-[#00000066] uppercase tracking-wider mb-2">
                                                                            <Type className="w-3 h-3" /> Section Heading (ENG)
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Enter heading..."
                                                                            value={section.heading.en}
                                                                            minLength={3}
                                                                            maxLength={100}
                                                                            onChange={(e) => updateSection(section.id, 'heading', 'en', e.target.value)}
                                                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold text-brand-blue"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="flex items-center gap-2 text-[10px] font-bold text-[#00000066] uppercase tracking-wider mb-2">
                                                                            <AlignLeft className="w-3 h-3" /> Section Content (ENG)
                                                                        </label>
                                                                        <textarea
                                                                            rows={6}
                                                                            placeholder="Enter article paragraphs..."
                                                                            value={section.content.en}
                                                                            minLength={20}
                                                                            maxLength={5000}
                                                                            onChange={(e) => updateSection(section.id, 'content', 'en', e.target.value)}
                                                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none leading-relaxed"
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-6">
                                                                    <div>
                                                                        <label className="flex items-center justify-end gap-2 text-[10px] font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">
                                                                            عنوان القسم (AR) <Type className="w-3 h-3" />
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            dir="rtl"
                                                                            placeholder="أدخل العنوان..."
                                                                            value={section.heading.ar}
                                                                            minLength={3}
                                                                            maxLength={100}
                                                                            onChange={(e) => updateSection(section.id, 'heading', 'ar', e.target.value)}
                                                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold text-brand-blue"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="flex items-center justify-end gap-2 text-[10px] font-bold text-[#00000066] uppercase tracking-wider mb-2 text-right">
                                                                            محتوى القسم (AR) <AlignLeft className="w-3 h-3" />
                                                                        </label>
                                                                        <textarea
                                                                            rows={6}
                                                                            dir="rtl"
                                                                            placeholder="أدخل فقرات المقال..."
                                                                            value={section.content.ar}
                                                                            minLength={20}
                                                                            maxLength={5000}
                                                                            onChange={(e) => updateSection(section.id, 'content', 'ar', e.target.value)}
                                                                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none leading-relaxed"
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button type="button" onClick={addSection} className="w-full py-6 border-2 border-dashed border-border-stroke bg-white rounded-3xl text-sm font-bold text-[#00000033] hover:border-brand-blue/30 hover:text-brand-blue transition-all flex items-center justify-center gap-2 group cursor-pointer">
                                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                        Add Another Content Section
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-8 border-t border-border-stroke">
                                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="flex-1 cursor-pointer py-4 text-sm font-bold text-[#00000099] hover:bg-black/5 rounded-2xl transition-all disabled:opacity-50">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="flex-[2] cursor-pointer py-4 bg-brand-gradient text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                                    {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                    {isSubmitting ? (editingArticle ? "Updating..." : "Publishing...") : (editingArticle ? "Update Article" : "Publish Article")}
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
                onConfirm={deleteArticle}
                title="Delete Article"
                message="Are you sure you want to delete this article? This action cannot be undone."
                isLoading={isSubmitting}
            />
        </div>
    );
}
