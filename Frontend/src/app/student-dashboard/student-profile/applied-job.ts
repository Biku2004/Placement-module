export interface AppliedJob {
    jobId: number;
    companyName: string;
    jobRole: string;
    logo: string;
    applicationDate: string; // Date when applied
    status: string;          // e.g., "Submitted", "Viva Round", "Assessment Round", "Rejected", "Offer Received"
    rounds: Round[];         // List of rounds with their status
  }
  
  export interface Round {
    name: string;            // e.g., "Viva Round", "Assessment Round"
    status: string;          // e.g., "Pending", "Opened", "Completed", "Failed"
    date?: string;           // Optional date of the round
  }