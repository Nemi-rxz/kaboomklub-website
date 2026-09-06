import Link from "next/link";
import PostForm from "../PostForm";

export default function NewContentPage() {
  return <div className="p-8 text-white"><div className="mb-8 flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b3241b]">Editorial CMS</p><h1 className="mt-2 text-3xl font-black uppercase">New Story</h1></div><Link href="/admin/content" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Back to content</Link></div><PostForm id={null} /></div>;
}