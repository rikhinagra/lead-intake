"use client";

import { useState } from "react";
import { Briefcase, IdCard, Users, HelpCircle, Plus, X, Send, CheckCircle2 } from "lucide-react";
import { CASE_TYPES, US_STATES, LeadFormData, InjuredPerson, initialFormData } from "@/lib/types";
import { getCaseTypeMeta } from "@/lib/caseTypeMeta";
import Field from "@/components/ui/Field";
import SectionCard from "@/components/ui/SectionCard";
import PhoneField from "@/components/ui/PhoneField";
import Turnstile from "@/components/ui/Turnstile";
import Dropdown from "@/components/ui/Dropdown";

type InvalidFields = Set<string>;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LeadForm() {
  const [data, setData] = useState<LeadFormData>(initialFormData);
  const [invalid, setInvalid] = useState<InvalidFields>(new Set());
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const meta = getCaseTypeMeta(data.caseType);

  function update(patch: Partial<LeadFormData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function updatePerson(id: number, patch: Partial<InjuredPerson>) {
    setData((prev) => ({
      ...prev,
      injuredPeople: prev.injuredPeople.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }

  function addPerson() {
    setData((prev) => ({
      ...prev,
      injuredPeople: [
        ...prev.injuredPeople,
        { id: Date.now(), firstName: "", lastName: "", injuryDescription: "" },
      ],
    }));
  }

  function removePerson(id: number) {
    setData((prev) => ({
      ...prev,
      injuredPeople: prev.injuredPeople.filter((p) => p.id !== id),
    }));
  }

  function validate(): boolean {
    const bad: InvalidFields = new Set();

    if (!data.firstName.trim()) bad.add("firstName");
    if (!data.lastName.trim()) bad.add("lastName");
    if (data.email.trim() && !isEmail(data.email)) bad.add("email");
    if (!data.address.trim()) bad.add("address");
    if (!data.accidentDate) bad.add("accidentDate");
    if (!data.accidentDescription.trim()) bad.add("accidentDescription");
    data.injuredPeople.forEach((p) => {
      if (!p.injuryDescription.trim()) bad.add(`injury-${p.id}`);
    });

    setInvalid(bad);
    return bad.size === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // No backend yet — this just confirms the form was filled out correctly.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <h2 className="text-lg font-semibold text-ink">Lead submitted</h2>
        <p className="text-[13.5px] text-ink-soft">
          {data.firstName} {data.lastName}&rsquo;s case details have been recorded.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <SectionCard icon={Briefcase} title="Basic lead information">
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <Field label="Case type">
            <select
              className="hidden md:block"
              value={data.caseType}
              onChange={(e) => update({ caseType: e.target.value })}
            >
              {CASE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Dropdown
              value={data.caseType}
              onChange={(v) => update({ caseType: v })}
              options={CASE_TYPES.map((type) => ({ value: type, label: type }))}
            />
          </Field>
          <Field label="Occupation">
            <input
              type="text"
              placeholder="Warehouse associate"
              value={data.occupation}
              onChange={(e) => update({ occupation: e.target.value })}
            />
          </Field>
          <Field label="Do you have attorney?">
            <select
              className="hidden md:block"
              value={data.hasAttorney}
              onChange={(e) => update({ hasAttorney: e.target.value as LeadFormData["hasAttorney"] })}
            >
              <option value="">Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <Dropdown
              value={data.hasAttorney}
              onChange={(v) => update({ hasAttorney: v as LeadFormData["hasAttorney"] })}
              placeholder="Select"
              options={[
                { value: "No", label: "No" },
                { value: "Yes", label: "Yes" },
              ]}
            />
          </Field>
          <Field label="Answering agent">
            <input
              type="text"
              placeholder="Agent name"
              value={data.answeringAgent}
              onChange={(e) => update({ answeringAgent: e.target.value })}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard icon={IdCard} title="Contact information">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <Field label="First name" required invalid={invalid.has("firstName")} error="First name is required">
              <input
                type="text"
                placeholder="Maria"
                value={data.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                className={invalid.has("firstName") ? "border-danger bg-danger-bg" : ""}
              />
            </Field>
            <Field label="Last name" required invalid={invalid.has("lastName")} error="Last name is required">
              <input
                type="text"
                placeholder="Lopez"
                value={data.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
                className={invalid.has("lastName") ? "border-danger bg-danger-bg" : ""}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <Field label="Email" invalid={invalid.has("email")} error="Enter a valid email">
              <input
                type="email"
                placeholder="maria.lopez@email.com"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                className={invalid.has("email") ? "border-danger bg-danger-bg" : ""}
              />
            </Field>
            <Field label="Phone">
              <PhoneField
                country={data.phoneCountry}
                onCountryChange={(c) => update({ phoneCountry: c })}
                value={data.phone}
                onChange={(v) => update({ phone: v })}
              />
            </Field>
          </div>

          <Field label="Alternative phone" className="sm:w-1/2 sm:pr-2">
            <PhoneField
              country={data.altPhoneCountry}
              onCountryChange={(c) => update({ altPhoneCountry: c })}
              value={data.altPhone}
              onChange={(v) => update({ altPhone: v })}
            />
          </Field>

          <Field label="Best time to call">
            <input
              type="text"
              placeholder="Weekdays after 5pm"
              value={data.bestTimeToCall}
              onChange={(e) => update({ bestTimeToCall: e.target.value })}
            />
          </Field>

          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
            <Field label="Mailing State">
              <select
                className="hidden md:block"
                value={data.mailingState}
                onChange={(e) => update({ mailingState: e.target.value })}
              >
                <option value="">Select</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <Dropdown
                value={data.mailingState}
                onChange={(v) => update({ mailingState: v })}
                placeholder="Select"
                options={US_STATES.map((state) => ({ value: state, label: state }))}
              />
            </Field>
            <Field label="Mailing City">
              <input
                type="text"
                placeholder="Los Angeles"
                value={data.mailingCity}
                onChange={(e) => update({ mailingCity: e.target.value })}
              />
            </Field>
            <Field label="Mailing ZIP">
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder="90012"
                value={data.mailingZip}
                onChange={(e) => update({ mailingZip: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Address" required invalid={invalid.has("address")} error="Address is required">
            <input
              type="text"
              placeholder="123 Main St"
              value={data.address}
              onChange={(e) => update({ address: e.target.value })}
              className={invalid.has("address") ? "border-danger bg-danger-bg" : ""}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard icon={meta.icon} title={meta.sectionTitle}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <Field
              label="Accident date"
              required
              invalid={invalid.has("accidentDate")}
              error="Accident date is required"
            >
              <input
                type="date"
                value={data.accidentDate}
                onChange={(e) => update({ accidentDate: e.target.value })}
                className={invalid.has("accidentDate") ? "border-danger bg-danger-bg" : ""}
              />
            </Field>
            <Field label="Accident time">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <select
                    aria-label="Hour"
                    className="hidden md:block"
                    value={data.accidentHour}
                    onChange={(e) => update({ accidentHour: e.target.value })}
                  >
                    <option value="">Hour</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  <Dropdown
                    value={data.accidentHour}
                    onChange={(v) => update({ accidentHour: v })}
                    placeholder="Hour"
                    options={Array.from({ length: 12 }, (_, i) => i + 1).map((h) => ({
                      value: String(h),
                      label: String(h),
                    }))}
                  />
                </div>
                <div>
                  <select
                    aria-label="Minute"
                    className="hidden md:block"
                    value={data.accidentMinute}
                    onChange={(e) => update({ accidentMinute: e.target.value })}
                  >
                    <option value="">Min</option>
                    {["00", "15", "30", "45"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <Dropdown
                    value={data.accidentMinute}
                    onChange={(v) => update({ accidentMinute: v })}
                    placeholder="Min"
                    options={["00", "15", "30", "45"].map((m) => ({ value: m, label: m }))}
                  />
                </div>
                <div>
                  <select
                    aria-label="AM or PM"
                    className="hidden md:block"
                    value={data.accidentPeriod}
                    onChange={(e) =>
                      update({ accidentPeriod: e.target.value as LeadFormData["accidentPeriod"] })
                    }
                  >
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <Dropdown
                    value={data.accidentPeriod}
                    onChange={(v) => update({ accidentPeriod: v as LeadFormData["accidentPeriod"] })}
                    placeholder="AM/PM"
                    options={[
                      { value: "AM", label: "AM" },
                      { value: "PM", label: "PM" },
                    ]}
                  />
                </div>
              </div>
            </Field>
          </div>

          <Field
            label="Accident description"
            required
            invalid={invalid.has("accidentDescription")}
            error="Accident description is required"
          >
            <textarea
              placeholder="Rear-ended at a red light on Main St. Other driver ran the light. Police report taken."
              value={data.accidentDescription}
              onChange={(e) => update({ accidentDescription: e.target.value })}
              className={invalid.has("accidentDescription") ? "border-danger bg-danger-bg" : ""}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        icon={Users}
        title="Injured people"
        action={
          <button
            type="button"
            onClick={addPerson}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-icon-bg"
          >
            <Plus className="h-3.5 w-3.5" />
            Add person
          </button>
        }
      >
        <div className="flex flex-col gap-4">
          {data.injuredPeople.map((person, index) => (
            <div key={person.id} className="rounded-lg border border-border-soft p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[13px] font-medium text-ink-soft">Person {index + 1}</span>
                {data.injuredPeople.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePerson(person.id)}
                    className="text-ink-muted transition-colors hover:text-danger"
                    aria-label={`Remove person ${index + 1}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <Field label="First name">
                    <input
                      type="text"
                      placeholder="Maria"
                      value={person.firstName}
                      onChange={(e) => updatePerson(person.id, { firstName: e.target.value })}
                    />
                  </Field>
                  <Field label="Last name">
                    <input
                      type="text"
                      placeholder="Lopez"
                      value={person.lastName}
                      onChange={(e) => updatePerson(person.id, { lastName: e.target.value })}
                    />
                  </Field>
                </div>
                <Field
                  label="Description of injury"
                  required
                  invalid={invalid.has(`injury-${person.id}`)}
                  error="Describe the injury"
                >
                  <textarea
                    placeholder="Neck pain, headaches, and lower back pain"
                    value={person.injuryDescription}
                    onChange={(e) => updatePerson(person.id, { injuryDescription: e.target.value })}
                    className={invalid.has(`injury-${person.id}`) ? "border-danger bg-danger-bg" : ""}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={HelpCircle} title="Additional information">
        <Field label="Additional info">
          <textarea
            placeholder="Insurance company, claim number, witnesses, or anything else we should know"
            value={data.additionalInfo}
            onChange={(e) => update({ additionalInfo: e.target.value })}
          />
        </Field>
      </SectionCard>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Turnstile onVerify={setTurnstileToken} />
        <button
          type="submit"
          disabled={!turnstileToken}
          className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
          Submit intake
        </button>
      </div>
    </form>
  );
}
