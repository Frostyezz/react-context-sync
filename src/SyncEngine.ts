type SyncCallback = (data: any) => void;

export class SyncEngine {
  private channel: BroadcastChannel | null;

  constructor(channelName: string) {
    if ("BroadcastChannel" in window) {
      this.channel = new BroadcastChannel(channelName);
    } else {
      this.channel = null;
    }
  }

  onMessage(callback: SyncCallback): void {
    if (this.channel) {
      this.channel.onmessage = (event) => {
        callback(event.data);
      };
    }
  }

  onMessageError(): void {
    if (this.channel) {
      this.channel.onmessageerror = (event) => console.error(event);
    }
  }

  sendMessage(data: any): void {
    if (this.channel) {
      this.channel.postMessage(data);
    }
  }

  close(): void {
    if (this.channel) {
      this.channel.close();
    }
  }
}
