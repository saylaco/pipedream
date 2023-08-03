import { defineApp } from "@pipedream/types";
import { axios } from "@pipedream/platform";
import {
  APP_URL,
  BASE_URL, CONTENT_TYPE_HEADER, DEFAULT_DATA, JSON_CONTENT_TYPE, VERSION_PATH, X_API_KEY_HEADER,
} from "../common/constants";
import {
  Client, CreateClient, HttpRequestParams, PdAxiosRequest,
} from "../common/types";

export default defineApp({
  type: "app",
  // @todo change to moxie
  app: "pipedream",
  propDefinitions: {

    clientName: {
      type: "string",
    },
    clientType: {
      type: "string",
      options: [
        "Client",
        "Prospect",
      ],
    },
    initials: {
      type: "string",
      optional: true,
    },
    currency: {
      type: "string",
      default: "USD",
    },
    stripeClientId: {
      type: "string",
      optional: true,
    },
    contacts: {
      type: "object",
      optional: true,
      description: "An array of contact objects",
      default: [
        DEFAULT_DATA.contact(),
      ],
    },
    // CONTACT PROPS
    firstName: {
      type: "string",
      optional: true,
    },
    lastName: {
      type: "string",
      optional: true,
    },
    contactRole: {
      type: "string",
      optional: true,
    },
    phone: {
      type: "string",
      optional: true,
    },
    email: {
      type: "string",
      optional: true,
    },
    address: {
      type: "object",
      optional: true,
      default: DEFAULT_DATA.clientAddress(),
    },
    contact: {
      type: "object",
      optional: true,
      default: DEFAULT_DATA.firstContact(),
    },
    notes: {
      type: "string",
      optional: true,
    },
    whoPaysCardFee: {
      type: "string",
      optional: true,
      options: [
        "Client",
        "Freelancer",
        "Split",
      ],
    },
  },
  methods: {
    // this.$auth contains connected account data
    authKeys() {
      console.log(Object.keys(this.$auth));
    },
    async listClients({
      $, query,
    }: PdAxiosRequest & { query?: string; }): Promise<Client[]> {
      // @ts-ignore
      return this._makeRequest<Client[]>($, query
        ? {
          method: "get",
          path: "action/clients/search",
          query,
        }
        : {
          method: "get",
          path: "action/clients/list",
        });
    },
    clientUrl(id = "") {
      return `${APP_URL}/client/${id}`;
    },
    async createClient({
      $, client,
    }: PdAxiosRequest & { client: CreateClient; }): Promise<Client[]> {
      // @ts-ignore
      return this._makeRequest<Client[]>($, {
        method: "post",
        path: "action/clients/create",
        data: client,
      });

    },
    async _makeRequest<T = object>(
      $ = this,
      {
        url,
        params,
        path,
        ...args
      }: HttpRequestParams,
    ): Promise<T> {
      const headers = {
        ...args.headers,
        [X_API_KEY_HEADER]: this.$auth.api_key,
        [CONTENT_TYPE_HEADER]: JSON_CONTENT_TYPE,
      };

      const config = {
        ...args,
        headers,
        url: url ?? `${this._getBaseUrl()}/${path}`,
        params: url
          ? undefined
          : params,
        timeout: 10000,
      };

      return await axios($ ?? this, config);
    },
    _getBaseUrl() {
      return `${BASE_URL}${VERSION_PATH}`;
    },
  },
})
;
