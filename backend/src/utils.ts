import { isAfter, isBefore, startOfDay } from "date-fns";
import { Studio } from "./types";
import { SearchInput } from "./inputs";
import { StudioData } from "./data/types";

type SearchString = keyof SearchInput & keyof Studio;
const stringKeys: SearchString[] = ["city", "state", "country"];

export const filterStages = (
  searchQuery: SearchInput | undefined,
  data: StudioData[]
) =>
  searchQuery
    ? data.filter((studio) =>
        // Either filter not present, or filter match with value
        stringKeys.every(
          (k) =>
            !searchQuery[k] ||
            // Use lower case to expand results
            studio[k].toLowerCase() === searchQuery[k]?.toLowerCase()
        )
      )
    : // If query not present, just return all data
      data;

export const filterDates = (
  searchQuery: SearchInput | undefined,
  filteredStudios: StudioData[]
) => {
  // Make sure we compare with the start of day, so `isBefore` or `isAfter` are false with same dates
  const queryStartDate = searchQuery?.startDate
    ? startOfDay(searchQuery.startDate)
    : undefined;
  const queryEndDate = searchQuery?.endDate
    ? startOfDay(searchQuery.endDate)
    : undefined;

  const response: Studio[] = [];

  // Search for matching dates on filtered studios
  filteredStudios.forEach((studio) => {
    studio.sound_stages.forEach((stage) => {
      // Use regular for, so we can break and stop searching for dates on same stage
      for (const date of stage.available_dates) {
        // Either filter not present, or filter date is same or after start date
        if (
          !queryStartDate ||
          !isBefore(queryStartDate, startOfDay(new Date(date.start_date)))
        ) {
          // Either filter not present, or infinite availability, or filter date is same or before end date
          if (
            !queryEndDate ||
            !date.end_date ||
            !isAfter(queryEndDate, startOfDay(new Date(date.end_date)))
          ) {
            // Construct response and stop looking for available dates
            response.push({
              id: studio.id,
              city: studio.city,
              state: studio.state,
              country: studio.country,
              studioName: studio.studio_name,
              availableStage: {
                stageId: stage.stage_id,
                stageNumber: stage.stage_number,
              },
            });
            break;
          }
        }
      }
    });
  });

  return response;
};
