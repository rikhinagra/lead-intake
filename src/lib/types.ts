export interface InjuredPerson {
  id: number;
  firstName: string;
  lastName: string;
  injuryDescription: string;
}

export interface LeadFormData {
  caseType: string;
  occupation: string;
  hasAttorney: "" | "Yes" | "No";
  answeringAgent: string;

  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  altPhoneCountry: string;
  altPhone: string;
  bestTimeToCall: string;
  mailingState: string;
  mailingCity: string;
  mailingZip: string;
  address: string;

  accidentDate: string;
  accidentHour: string;
  accidentMinute: string;
  accidentPeriod: "AM" | "PM" | "";
  accidentDescription: string;

  injuredPeople: InjuredPerson[];

  additionalInfo: string;
}

export const CASE_TYPES = [
  "Automobile Accident",
  "Truck Accident",
  "Motorcycle Accident",
  "Rideshare Accident",
  "Pedestrian Accident",
  "Slip & Fall",
  "Dog Bite",
  "Wrongful Death",
  "Other",
] as const;

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming", "District of Columbia",
] as const;

export const COUNTRY_CODES = [
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "CA", dial: "+1", flag: "🇨🇦" },
  { code: "MX", dial: "+52", flag: "🇲🇽" },
] as const;

export const initialFormData: LeadFormData = {
  caseType: "Automobile Accident",
  occupation: "",
  hasAttorney: "",
  answeringAgent: "",

  firstName: "",
  lastName: "",
  email: "",
  phoneCountry: "US",
  phone: "",
  altPhoneCountry: "US",
  altPhone: "",
  bestTimeToCall: "",
  mailingState: "",
  mailingCity: "",
  mailingZip: "",
  address: "",

  accidentDate: "",
  accidentHour: "",
  accidentMinute: "",
  accidentPeriod: "",
  accidentDescription: "",

  injuredPeople: [{ id: 1, firstName: "", lastName: "", injuryDescription: "" }],

  additionalInfo: "",
};
