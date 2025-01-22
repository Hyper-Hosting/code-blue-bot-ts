export default interface IHandler {
  LoadEvents(): void;
  LoadCommands(): void;
  LoadInteractions(): void;
  LoadGuildMemberAdd(): void;
}
