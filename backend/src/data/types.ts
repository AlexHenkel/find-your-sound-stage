export interface StudioData {
  id: number;
  studio_name: string;
  city: string;
  state: string;
  country: string;
  sound_stages: SoundStage[];
}

interface SoundStage {
  stage_id: number;
  stage_number: string;
  available_dates: AvailableDate[];
}

interface AvailableDate {
  id: number;
  start_date: string;
  end_date: string | null;
}
