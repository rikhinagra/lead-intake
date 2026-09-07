import LeadForm from "@/components/LeadForm";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-ink">New Lead</h1>
        <p className="mt-1 text-[13.5px] text-ink-soft">Capture essential case details.</p>
      </div>
      <LeadForm />
    </main>
  );
}
