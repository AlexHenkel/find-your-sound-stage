export interface ApiResponse {
  search: StudioResult[];
}

export interface StudioResult {
  id: number;
  studioName: string;
  city: string;
  state: string;
  country: string;
  availableStage: SoundStage;
}

export interface SoundStage {
  stageId: number;
  stageNumber: string;
}
