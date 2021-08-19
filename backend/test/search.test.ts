import { filterDates, filterStages } from "../src/utils";
import { SearchInput } from "../src/inputs";
import { StudioData } from "../src/data/types";
import data from "../src/data/stageData.json";
import { startOfDay } from "date-fns";

test("Filter stages correctly with city filter", () => {
  const testSearch: SearchInput = { city: "Los Angeles" };
  const res = filterStages(testSearch, data);

  expect(res).toMatchSnapshot();
  expect(res.every(({ city }) => city === "Los Angeles")).toBe(true);
});

test("Filter stages correctly with city and state filters", () => {
  const testSearch: SearchInput = { city: "Los Angeles", state: "California" };
  const res = filterStages(testSearch, data);

  expect(res).toMatchSnapshot();
  expect(
    res.every(
      ({ city, state }) => city === "Los Angeles" && state == "California"
    )
  ).toBe(true);
});

test("Filter stages correctly with city, state and country filters", () => {
  const testSearch: SearchInput = {
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
  };
  const res = filterStages(testSearch, data);

  expect(res).toMatchSnapshot();
  expect(
    res.every(
      ({ city, state, country }) =>
        city === "Los Angeles" &&
        state == "California" &&
        country === "United States of America"
    )
  ).toBe(true);
});

test("Empty results with wrong filter", () => {
  const testSearch: SearchInput = {
    city: "Legoland",
    state: "California",
    country: "United States of America",
  };
  const res = filterStages(testSearch, data);

  expect(res).toMatchSnapshot();
  expect(res).toHaveLength(0);
});

const mockData: StudioData[] = [
  {
    id: 1,
    studio_name: "Sunset Bronson",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    sound_stages: [
      {
        stage_id: 1,
        stage_number: "1A",
        available_dates: [
          {
            id: 111,
            start_date: "2020-01-20",
            end_date: "2020-03-15",
          },
          {
            id: 112,
            start_date: "2020-05-01",
            end_date: null,
          },
        ],
      },
    ],
  },
];

test("Get all dates with no date filters", () => {
  const res = filterDates({}, filterStages({}, mockData));
  expect(res).toHaveLength(1);
});

test("Get dates with start and end filter", () => {
  const testSearch: SearchInput = {
    startDate: startOfDay(new Date("2020-01-28")),
    endDate: startOfDay(new Date("2020-03-01")),
  };
  const res = filterDates(testSearch, filterStages(testSearch, mockData));
  expect(res).toHaveLength(1);
});

test("Get no dates with start filter out of range", () => {
  const testSearch: SearchInput = {
    startDate: startOfDay(new Date("2020-01-19")),
    endDate: startOfDay(new Date("2020-03-01")),
  };
  const res = filterDates(testSearch, filterStages(testSearch, mockData));
  expect(res).toHaveLength(0);
});

test("Get no dates with end filter out of range", () => {
  const testSearch: SearchInput = {
    startDate: startOfDay(new Date("2020-01-28")),
    endDate: startOfDay(new Date("2020-03-16")),
  };
  const res = filterDates(testSearch, filterStages(testSearch, mockData));
  expect(res).toHaveLength(0);
});

test("Get dates with start and infinite end", () => {
  const testSearch: SearchInput = {
    startDate: startOfDay(new Date("2020-05-02")),
    endDate: startOfDay(new Date("2023-05-03")),
  };
  const res = filterDates(testSearch, filterStages(testSearch, mockData));
  expect(res).toHaveLength(1);
});
