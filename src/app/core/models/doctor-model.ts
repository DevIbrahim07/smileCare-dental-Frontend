export interface DoctorModel {
  _id: string;
  name: string;
  speciality: string;
  bio: string;
  photo: string;
  qualifications: string[];
  experience: number; // years
  workingDays: string[]; // ['Monday','Tuesday',...]
  workingHours: {
    start: string; // '09:00'
    end: string; // '17:00'
  };
  slotDuration: number; // minutes (e.g. 30)
  isAvailable: boolean;
}
