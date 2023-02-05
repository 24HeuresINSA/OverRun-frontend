export interface Payment {
  id: number;
  donationAmount: number;
  totalAmount: number;
  raceAmount: number;
  status: PaymentStatus;
  helloassoCheckoutExpiresAt: string;
  helloassoCheckoutIntentId: number;
  helloassoCheckoutIntentUrl: string;
  helloassoPaymentReceiptUrl: string;
  inscription: Inscription;
}

export enum PaymentStatus {
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  REFUSED = "REFUSED",
  REFUNDING = "REFUNDING",
  REFUND = "REFUND",
}

export interface Inscription {
  athlete: Athlete;
  id: number;
  race: Race;
  edition: { id: number };
  va: boolean;
}

export interface Race {
  id: number;
  name: string;
  registrationPrice: number;
  vaRegistrationPrice: number;
}

export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
}
