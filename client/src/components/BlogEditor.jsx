import AnimationWrapper from "./AnimationWrapper";
import { useContext, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/EditorPage";
import { tools } from "./Tools";
import EditorJs from "@editorjs/editorjs";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { UploadImage } from "../common/aws";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const BlogEditor = () => {
  const {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  const navigate = useNavigate();
  const { userAuth } = useStateContext();
  const { blog_id } = useParams();
  const blogBannerRef = useRef();
  const [isRTL, setIsRTL] = useState(false);
  const [uploading, setUploading] = useState(false);

  const editorInstance = useRef(null);

  // Initialize EditorJS
  useEffect(() => {
    if (!editorInstance.current) {
      const editor = new EditorJs({
        holderId: "textEditor",
        data: Array.isArray(content) ? content[0] : content,
        tools: tools,
        placeholder: isRTL
          ? "ابدأ بكتابة مقالك هنا..."
          : "Start writing your article here...",
      });
      
      editorInstance.current = editor;
      setTextEditor(editor);
    }
  }, []);

  // ─── Handlers ──────────────────────────────────────────────────────────
  const handleBannerUpload = (e) => {
    const img = e.target.files[0];
    if (!img) return;

    setUploading(true);
    const loadingToast = toast.loading("Uploading banner...");

    UploadImage(img)
      .then((url) => {
        if (url) {
          toast.dismiss(loadingToast);
          toast.success("Banner uploaded!");
          setBlog({ ...blog, banner: url });
        }
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        toast.error("Upload failed");
        console.error(err);
      })
      .finally(() => setUploading(false));
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) e.preventDefault();
  };

  const handleTitleChange = (e) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };

  const handlePublishEvent = () => {
    if (!title.length) {
      return toast.error("Please add a title before publishing");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            return toast.error("Write some content before publishing");
          }
        })
        .catch(console.error);
    }
  };

  const handleDraftEvent = (e) => {
    if (e.target.classList.contains("disable")) return;
    if (!title.length) {
      return toast.error("Add a title before saving as draft");
    }

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        const blogObj = { title, banner, des, content, tags, draft: true };
        const loadingToast = toast.loading("Saving draft...");
        e.target.classList.add("disable");

        axios
          .post(`${API}/blogs`, blogObj, {
            headers: { Authorization: `Bearer ${userAuth?.access_token}` },
          })
          .then(() => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.success("Draft saved!");
            setTimeout(() => navigate("/blogs"), 500);
          })
          .catch(({ response }) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.error(response?.data?.error || "Failed to save draft");
          });
      });
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fafafa]" dir={isRTL ? "rtl" : "ltr"}>
      <Toaster position="top-center" />

      {/* ── Top Navbar ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white border-b border-rekaz-border">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Left: Logo & back */}
          <div className="flex items-center gap-4">
            <Link
              to="/blogs"
              className="flex items-center gap-2 text-rekaz-dark hover:text-rekaz-blue transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
              <span className="font-satoshi font-semibold text-lg">Rekaz Editor</span>
            </Link>
          </div>

          {/* Center: Language toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-rekaz-bg border border-rekaz-border rounded-btn p-1">
            <button
              onClick={() => setIsRTL(false)}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-satoshi font-medium transition-all ${
                !isRTL
                  ? "bg-white text-rekaz-dark shadow-sm"
                  : "text-rekaz-muted hover:text-rekaz-dark"
              }`}
            >
              English (LTR)
            </button>
            <button
              onClick={() => setIsRTL(true)}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-satoshi font-medium transition-all ${
                isRTL
                  ? "bg-white text-rekaz-dark shadow-sm"
                  : "text-rekaz-muted hover:text-rekaz-dark"
              }`}
            >
              العربية (RTL)
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDraftEvent}
              className="px-4 py-2 rounded-btn text-sm font-satoshi font-medium text-rekaz-grey border border-rekaz-border hover:border-rekaz-dark hover:text-rekaz-dark transition-colors"
            >
              {isRTL ? "حفظ مسودة" : "Save Draft"}
            </button>
            <button
              onClick={handlePublishEvent}
              className="px-5 py-2 rounded-btn text-sm font-satoshi font-medium text-white bg-rekaz-blue hover:bg-rekaz-blue/90 transition-colors shadow-[0_2px_8px_rgba(4,18,250,0.25)]"
            >
              {isRTL ? "نشر" : "Publish"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Editor Area ─────────────────────────────────────────────── */}
      <AnimationWrapper>
        <main className="max-w-3xl mx-auto px-5 py-10">

          {/* Mobile RTL toggle */}
          <div className="sm:hidden flex items-center gap-1 bg-rekaz-bg border border-rekaz-border rounded-btn p-1 mb-6 w-fit">
            <button
              onClick={() => setIsRTL(false)}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-satoshi font-medium transition-all ${
                !isRTL ? "bg-white text-rekaz-dark shadow-sm" : "text-rekaz-muted"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setIsRTL(true)}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-satoshi font-medium transition-all ${
                isRTL ? "bg-white text-rekaz-dark shadow-sm" : "text-rekaz-muted"
              }`}
            >
              AR
            </button>
          </div>

          {/* ── Banner Upload ─────────────────────────────────────────── */}
          <label
            htmlFor="blog-banner"
            className={`group relative block w-full aspect-video rounded-card overflow-hidden cursor-pointer border-2 border-dashed transition-colors ${
              banner
                ? "border-transparent"
                : "border-rekaz-border hover:border-rekaz-blue/40"
            }`}
          >
            {banner ? (
              <img
                src={banner}
                ref={blogBannerRef}
                alt="Blog banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-3">
                {uploading ? (
                  <div className="w-8 h-8 border-2 border-rekaz-blue border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full bg-rekaz-bg flex items-center justify-center group-hover:bg-rekaz-blue/10 transition-colors">
                      <svg className="w-6 h-6 text-rekaz-muted group-hover:text-rekaz-blue transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                    <p className="text-rekaz-muted font-satoshi text-sm font-medium group-hover:text-rekaz-blue transition-colors">
                      {isRTL ? "انقر لرفع صورة الغلاف" : "Click to upload cover image"}
                    </p>
                    <p className="text-rekaz-muted/60 font-dm text-xs">
                      {isRTL ? "الأبعاد المثالية 1600×900" : "Recommended: 1600×900px"}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Hover overlay when image exists */}
            {banner && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-satoshi text-sm font-medium bg-black/50 px-4 py-2 rounded-btn">
                  {isRTL ? "تغيير الصورة" : "Change image"}
                </span>
              </div>
            )}

            <input
              id="blog-banner"
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              hidden
            />
          </label>

          {/* ── Title ─────────────────────────────────────────────────── */}
          <textarea
            defaultValue={title}
            placeholder={isRTL ? "عنوان المقال" : "Article title"}
            dir={isRTL ? "rtl" : "ltr"}
            className={`w-full mt-8 text-3xl md:text-4xl font-satoshi font-bold text-rekaz-dark bg-transparent outline-none resize-none leading-tight placeholder:text-rekaz-muted/40 ${
              isRTL ? "text-right" : "text-left"
            }`}
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
            rows={1}
          />

          {/* Divider */}
          <div className="w-16 h-1 bg-rekaz-blue/20 rounded-full my-6" />

          {/* ── EditorJS ──────────────────────────────────────────────── */}
          <div
            id="textEditor"
            dir={isRTL ? "rtl" : "ltr"}
            className={`w-full font-dm text-lg text-rekaz-dark min-h-[300px] ${
              isRTL ? "text-right [&_.ce-paragraph]:text-right [&_.ce-header]:text-right" : ""
            }`}
          />
        </main>
      </AnimationWrapper>
    </div>
  );
};

export default BlogEditor;
