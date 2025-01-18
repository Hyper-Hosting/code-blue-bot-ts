import { IArrestReport } from "../models/ArrestReport";
import { ICharacter } from "../models/Character";
import { IFirearmsDischarge } from "../models/FirearmsDischarge";
import { IMvcr } from "../models/Mvcr";
import { IPoliceIncident } from "../models/PoliceIncident";

export type ReportsType = {
  arrestReports: (IArrestReport & {
    characters: {
      characterId: ICharacter;
      involvement: string;
    }[];
    characterId: ICharacter;
  })[];
  mvcReports: IMvcr[];
  firearmReports: (IFirearmsDischarge & {
    characterId: ICharacter;
  })[];
  policeIncidentReports: (IPoliceIncident & {
    characters: {
      characterId: ICharacter;
      involvement: string;
    }[];
  })[];
};