export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface AppointmentModel {
  _id: string;
  patientId: string;
  doctorId: string;
  doctor?: { name: string; speciality: string; photo: string };
  date: string; // 'YYYY-MM-DD'
  time: string; // '10:00 AM'
  service: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}
