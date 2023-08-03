import moxie from "../app/moxie.app";
import { DEFAULT_POLLING_SOURCE_TIMER_INTERVAL } from "@pipedream/platform";

export default {
  props: {
    moxie,
    db: "$.service.db",
    timer: {
      type: "$.interface.timer",
      default: {
        intervalSeconds: DEFAULT_POLLING_SOURCE_TIMER_INTERVAL as number,
      },
    },
  },
  hooks: {
    activate() {
      const startTimestamp = new Date().toISOString();
      this.db.set("lastTimestamp", startTimestamp);
    },
    deactivate() {
      this.db.set("lastTimestamp", null);
    },
  },
  methods: {
    updateLastTimestamp(event) {
      const { timestamp } = event;
      const timestampMillis = timestamp
        ? timestamp * 1000
        : Date.now();
      const formattedTimestamp = new Date(timestampMillis).toISOString();
      this.db.set("lastTimestamp", formattedTimestamp);
    },
  },
};
