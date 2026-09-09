"use client";

import { useActionState } from "react";
import dynamic from "next/dynamic";
import {
  AdminFormField,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "@/components/admin/AdminFormField";

const MediaSelector = dynamic(
  () => import("@/components/admin/MediaSelector"),
  { ssr: false, loading: () => <p className="text-xs text-white/40">Loading media picker…</p> }
);

export type CrudFormState =
  | { error?: string; fieldErrors?: Record<string, string[]> }
  | null;
export type CrudAction = (
  id: string | null,
  previous: CrudFormState,
  formData: FormData
) => Promise<CrudFormState>;
export type CrudField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "checkbox" | "image";
  required?: boolean;
  options?: string[];
  hint?: string;
  allowNone?: boolean;
};

export default function CrudForm({
  id,
  action,
  fields,
  values = {},
  submitLabel = "Save",
}: {
  id: string | null;
  action: CrudAction;
  fields: CrudField[];
  values?: Record<string, string | boolean | undefined>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<CrudFormState, FormData>(
    action.bind(null, id),
    null
  );
  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => {
        const stringValue =
          typeof values[field.name] === "string"
            ? (values[field.name] as string)
            : undefined;
        if (field.type === "image") {
          return (
            <div key={field.name} className="sm:col-span-2">
              <MediaSelector
                name={field.name}
                label={field.label}
                value={stringValue ?? ""}
                required={field.required}
                hint={field.hint}
                allowNone={field.allowNone ?? true}
              />
            </div>
          );
        }
        return (
          <AdminFormField
            key={field.name}
            label={field.label}
            name={field.name}
            required={field.required}
            hint={field.hint}
            error={state?.fieldErrors?.[field.name]?.[0]}
          >
            {field.type === "textarea" ? (
              <AdminTextarea
                id={field.name}
                name={field.name}
                rows={5}
                defaultValue={stringValue}
              />
            ) : field.type === "select" ? (
              <AdminSelect
                id={field.name}
                name={field.name}
                defaultValue={stringValue}
              >
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </AdminSelect>
            ) : field.type === "checkbox" ? (
              <label className="flex items-center gap-2 pt-2 text-sm text-white/60">
                <input
                  id={field.name}
                  name={field.name}
                  type="checkbox"
                  value="true"
                  defaultChecked={values[field.name] === true}
                />{" "}
                Enabled
              </label>
            ) : (
              <AdminInput
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue={stringValue}
              />
            )}
          </AdminFormField>
        );
      })}
      <div className="sm:col-span-2">
        <button
          disabled={pending}
          className="bg-[#b3241b] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-50"
        >
          {pending ? "Saving..." : submitLabel}
        </button>
        {state?.error && (
          <p className="mt-3 text-xs font-bold text-[#b3241b]">
            {state.error}
          </p>
        )}
        {state?.fieldErrors && (
          <p className="mt-3 text-xs font-bold text-[#b3241b]">
            Please correct the highlighted fields.
          </p>
        )}
      </div>
    </form>
  );
}