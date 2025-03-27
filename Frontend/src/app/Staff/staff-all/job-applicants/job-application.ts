// export interface JobApplication {
//     id: number;
//     studentEmail: string;
//     jobPostId: number;
//     status: string;
//     companyName: string;
//     jobRole: string;
// }
// job-application.ts
export interface JobApplication {
    id: number;
    studentEmail: string;
    jobPostId: number;
    companyName: string;
    jobRole: string;
    status: string;
    applicationDate: string;
    logo: string;
    rounds: {
        id: number;
        name: string;
        status: string;
        date?: string;
    }[];
    selected?: boolean; // Add for selection
    examLink?: string; // Add exam link
    testScheduledTime?: string; // Add scheduled time
}