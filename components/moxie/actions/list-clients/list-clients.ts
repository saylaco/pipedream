import { defineAction } from "@pipedream/types";
import moxie from "../../app/moxie.app";

export default defineAction({
  key: "moxie-list-clients",
  name: "List or Search Clients",
  description: "List all Moxie clients. Provide a query to search for specific clients",
  type: "action",
  version: "0.0.5",
  props: {
    moxie,
    query: {
      optional: true,
      propDefinition: [
        moxie,
        "contactQuery",
      ],
    },
  },
  async run({ $ }) {
    const response = await this.moxie.listClients({
      $,
      query: this.query,
    });
    $.export("$summary", "Successfully retrieved clients.");
    return response;
  },
});
