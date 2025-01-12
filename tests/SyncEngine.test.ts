import { SyncEngine } from "../src/SyncEngine";

test("SyncEngine sends and receives messages", async () => {
  const engine = new SyncEngine("test-channel");
  const callback = jest.fn();
  engine.onMessage(callback);
  engine.sendMessage({ type: "TEST" });

  expect(callback).toHaveBeenCalledWith({ type: "TEST" });

  engine.close();
});
