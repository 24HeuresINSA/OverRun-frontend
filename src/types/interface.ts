import { PaymentStatus } from "./payment";

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Athlete {
  id: number;
  user: User;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export interface Admin {
  id: number;
  adminInscription: AdminInscription;
}

export interface AdminInscription {
  id: number;
  athleteId: number;
}

export interface Member {
  id: number;
  athlete: Athlete;
  status: InscriptionStatus;
}

export interface Team {
  id: number;
  name: string;
  members: Member[];
  admins: Admin[];
  race: Race;
}

export interface VA {
  id: number;
}
export interface Payment {
  id: number;
  status: PaymentStatus;
  raceAmount: number;
  donationAmount: number;
}

export interface Inscription {
  id: number;
  athlete: Athlete;
  team: Team;
  teamAdmin: boolean;
  va: VA | null;
  race: Race;
  certificate: Certificate | null;
  payment: Payment | null;
  status: InscriptionStatus;
}

export enum InscriptionStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  CANCELLED = "CANCELLED",
}

export interface Edition {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  edition: Edition;
  maxTeamMembers: number;
  minTeamMembers: number;
  races: Race[];
}

export interface Discipline {
  id: number;
  name: string;
  description: string;
  duration: number;
  discipline: {
    id: number;
    name: string;
  };
  races: {
    race: Race;
  }[];
}

export interface Id {
  id: number;
}

export interface Race {
  category: Category;
  id: number;
  disciplines: Discipline[];
  inscriptions: Inscription[];
  maxParticipants: number;
  maxTeams: number;
  name: string;
  teams: Id[];
  registrationPrice: number;
  vaRegistrationPrice: number;
}

export interface Certificate {
  id: number;
  status: number;
  filename: string;
  statusUpdatedAt: string;
  statusUpdatedBy: {
    id: number;
    user: User;
  };
  uploadAt: string;
  inscription: Inscription;
}
