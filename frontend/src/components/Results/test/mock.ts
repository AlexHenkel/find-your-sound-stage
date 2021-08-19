import { ApiResponse } from 'utils/api';

export const mockResponse: ApiResponse = {
  search: [
    {
      id: 1,
      studioName: 'Sunset Bronson',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States of America',
      availableStage: {
        stageId: 1,
        stageNumber: '1A',
      },
    },
    {
      id: 2,
      studioName: 'Screen Gems Studio',
      city: 'Atlanta',
      state: 'Georgia',
      country: 'United States of America',
      availableStage: {
        stageId: 3,
        stageNumber: '1',
      },
    },
    {
      id: 2,
      studioName: 'Screen Gems Studio',
      city: 'Atlanta',
      state: 'Georgia',
      country: 'United States of America',
      availableStage: {
        stageId: 4,
        stageNumber: '1A',
      },
    },
  ],
};
