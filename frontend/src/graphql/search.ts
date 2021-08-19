import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
  mutation Search($searchQuery: SearchInput) {
    search(query: $searchQuery) {
      id
      city
      state
      country
      studioName
      availableStage {
        stageId
        stageNumber
      }
    }
  }
`;
