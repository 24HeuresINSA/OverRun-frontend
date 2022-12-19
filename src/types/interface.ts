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
}

export interface Admin {
  id: number;
  adminInscription: Id;
}

export interface Member {
  id: number;
  athlete: Athlete;
  validated: boolean;
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

export interface Certifcate {
  id: number;
  status: number;
}

export interface Payment {
  id: number;
  status: number;
}

export interface Inscription {
  id: number;
  athlete: Athlete;
  team: Team;
  va: VA | null;
  race: Race;
  certificate: Certifcate | null;
  payment: Payment | null;
  teamAdmin: Id;
  validated: boolean;
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
  inscriptions: Id[];
  maxParticipants: number;
  maxTeams: number;
  name: string;
  teams: Id[];
}
