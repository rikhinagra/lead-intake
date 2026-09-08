import { Globe } from "lucide-react";
import { COUNTRY_CODES } from "@/lib/types";
import Dropdown from "@/components/ui/Dropdown";

interface PhoneFieldProps {
  country: string;
  onCountryChange: (country: string) => void;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}

export default function PhoneField({
  country,
  onCountryChange,
  value,
  onChange,
  invalid,
}: PhoneFieldProps) {
  const selected = COUNTRY_CODES.find((c) => c.code === country) ?? COUNTRY_CODES[0];

  return (
    <div className="flex gap-2">
      <div className="relative w-[112px] flex-shrink-0">
        <Globe className="pointer-events-none absolute top-1/2 left-2.5 z-10 hidden h-3.5 w-3.5 -translate-y-1/2 text-ink-muted md:block" />
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="hidden !pr-6 !pl-7 md:block"
          aria-label="Country code"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} {c.dial}
            </option>
          ))}
        </select>
        <Dropdown
          value={country}
          onChange={onCountryChange}
          icon={Globe}
          options={COUNTRY_CODES.map((c) => ({ value: c.code, label: `${c.code} ${c.dial}` }))}
        />
      </div>
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={selected.dial}
        className={invalid ? "border-danger bg-danger-bg" : ""}
      />
    </div>
  );
}
