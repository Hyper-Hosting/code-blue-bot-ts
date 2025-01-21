import CustomClient from "../classes/CustomClient";

export default interface IFeature {
  client: CustomClient;

  Execute(): void;
  AutoComplete(): void;
}
