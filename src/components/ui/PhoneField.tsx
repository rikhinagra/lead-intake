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
      <div className="w-[92px] flex-shrink-0">
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="hidden !pr-7 md:block"
          aria-label="Country code"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.dial}
            </option>
          ))}
        </select>
        <Dropdown
          value={country}
          onChange={onCountryChange}
          options={COUNTRY_CODES.map((c) => ({ value: c.code, label: `${c.flag} ${c.dial}` }))}
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
