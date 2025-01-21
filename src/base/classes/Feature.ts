import CustomClient from "./CustomClient";
import IFeature from "../interfaces/IFeature";

export default class Feature implements IFeature {
  client: CustomClient;

  constructor(client: CustomClient) {
    this.client = client;
  }

  Execute(): void {}
  AutoComplete(): void {}
}
