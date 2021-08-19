import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
class SoundStage {
  @Field(() => Int)
  stageId: number;

  @Field()
  stageNumber: string;
}

@ObjectType()
export class Studio {
  @Field(() => Int)
  id: number;

  @Field()
  studioName: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field(() => SoundStage)
  availableStage: SoundStage;
}
