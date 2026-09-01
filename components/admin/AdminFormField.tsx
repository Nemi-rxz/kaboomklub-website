import React from "react";

interface AdminFormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function AdminFormField({
  label,
  name,
  required,
  error,
  hint,
  children,
}: AdminFormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
      >
        {label}
        {required && <span className="ml-1 text-[#b3241b]">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[10px] text-white/25">{hint}</p>
      )}
      {error && (
        <p className="text-[10px] font-bold text-[#b3241b]">{error}</p>
      )}
    </div>
  );
}

const inputBase =
  "w-full border border-white/10 bg-[#1a1a1a] px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#b3241b] transition-colors";

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 4}
      className={`${inputBase} resize-y ${props.className ?? ""}`}
    />
  );
}

export function AdminSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${inputBase} cursor-pointer ${props.className ?? ""}`}
    />
  );
}
