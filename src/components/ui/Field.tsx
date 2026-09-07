import { ReactNode } from "react";

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  invalid?: boolean;
  children: ReactNode;
  className?: string;
}

export default function Field({
  label,
  required,
  error,
  invalid,
  children,
  className,
}: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="text-[13px] font-medium text-ink-soft">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      <div
        className={
          invalid
            ? "[&_input]:border-danger [&_input]:bg-danger-bg [&_select]:border-danger [&_textarea]:border-danger [&_textarea]:bg-danger-bg"
            : ""
        }
      >
        {children}
      </div>
      {invalid && error && (
        <span className="text-[12.5px] text-danger">{error}</span>
      )}
    </div>
  );
}
