import { Resolver, Arg, Mutation, Query } from "type-graphql";
import { Studio } from "./types";
import { SearchInput } from "./inputs";
import { filterDates, filterStages } from "./utils";
import data from "./data/stageData.json";

@Resolver(() => Studio)
export class StudioResolver {
  @Mutation(() => [Studio])
  async search(
    @Arg("query", { nullable: true })
    searchQuery?: SearchInput
  ): Promise<Studio[]> {
    // First get available studios based on stage filters, then filter dates per stage
    return filterDates(searchQuery, filterStages(searchQuery, data));
  }

  @Query(() => Boolean)
  healthCheck(): boolean {
    return true;
  }
}
