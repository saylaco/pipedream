export const APP_URL = "https://create.withmoxie.com";
export const BASE_URL = "https://pod01.withmoxie.com";
export const VERSION_PATH = "/api/public";
export const X_API_KEY_HEADER = "X-API-KEY";
export const CONTENT_TYPE_HEADER = "Content-Type";
export const JSON_CONTENT_TYPE = "application/json";
export const DEFAULT_DATA = {
  contact: () => ({
    "firstName": "",
    "lastName": "",
    "role": "",
    "phone": "",
    "email": "",
    "notes": "",
    "defaultContact": false,
    "invoiceContact": false,
    "portalAccess": false,
  }),
  firstContact() {
    return {
      ...this.contact(),
      portalAccess: "false",
      defaultContact: "true",
      invoiceContact: "true",
    };
  },
  client() {
    return {
      "name": "",
      "clientType": "Client",
      "initials": "",
      ...this.clientAddress(),
      "website": "",
      "phone": "",
      "color": "",
      "taxId": "",
      "leadSource": "",
      "archive": false,
      "paymentTerms": {
        "paymentDays": 0,
        "latePaymentFee": 0.00,
        "hourlyAmount": 0.00,
        "whoPaysCardFees": "Client",
      },
      "payInstructions": "",
      "hourlyAmount": 0.00,
      "roundingIncrement": 0,
      "currency": "USD",
      "stripeClientId": "",
      "notes": "",
      "contacts": [
        this.contact(),
      ],
    };
  },
  clientAddress() {
    return {
      "address1": "",
      "address2": "",
      "city": "",
      "locality": "",
      "postal": "",
      "country": "",
    };
  },
};
