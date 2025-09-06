export default interface Command {
  execute: (...args: any[]) => Promise<void> | void;
}
