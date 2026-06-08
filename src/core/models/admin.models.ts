import { CandidatProfil } from './candidatProfil';
import { Job } from './job';

export interface AdminApplication {
  id: number;
  candidatId?: number;
  offreId?: number;
  candidat?: CandidatProfil;
  offre?: Job;
  candidateId?: number;
  candidateName?: string;
  candidateEmail?: string;
  jobId?: number;
  jobTitre?: string;
  cvFileUrl?: string;
  dateCandidature?: string;
  appliedAt?: string;
  statut: ApplicationStatus | null;
}

export interface AdminCandidate {
  id: number;
  nom: string;
  email: string;
  titreProfil: string;
  experience: number;
  cvUrl?: string;
  competences?: string[];
}

export interface AdminJob extends Job {
  id: number;
  titre: string;
  description: string;
  experienceMin: number;
  competencesRequises: string[];
}

export interface JobRequest {
  titre: string;
  description: string;
  experienceMin: number;
  competencesRequises: string[];
}
export type ApplicationStatus =
  | 'EN_ATTENTE'
  | 'ACCEPTEE'
  | 'REFUSEE';