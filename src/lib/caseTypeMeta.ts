import { Car, Footprints, Dog, HeartCrack, AlertTriangle, LucideIcon } from "lucide-react";

interface CaseTypeMeta {
  sectionTitle: string;
  icon: LucideIcon;
}

const META: Record<string, CaseTypeMeta> = {
  "Automobile Accident": { sectionTitle: "Automobile accident details", icon: Car },
  "Truck Accident": { sectionTitle: "Truck accident details", icon: Car },
  "Motorcycle Accident": { sectionTitle: "Motorcycle accident details", icon: Car },
  "Rideshare Accident": { sectionTitle: "Rideshare accident details", icon: Car },
  "Pedestrian Accident": { sectionTitle: "Pedestrian accident details", icon: Car },
  "Slip & Fall": { sectionTitle: "Slip & fall details", icon: Footprints },
  "Dog Bite": { sectionTitle: "Dog bite details", icon: Dog },
  "Wrongful Death": { sectionTitle: "Wrongful death details", icon: HeartCrack },
  Other: { sectionTitle: "Incident details", icon: AlertTriangle },
};

export function getCaseTypeMeta(caseType: string): CaseTypeMeta {
  return META[caseType] ?? META.Other;
}
