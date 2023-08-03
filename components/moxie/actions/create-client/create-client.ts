import { defineAction } from "@pipedream/types";
import moxie from "../../app/moxie.app";
import {
  ClientAddress,
  Contact, CreateClient, PaymentTerms,
} from "../../common/types";

export default defineAction({
  key: "moxie-create-client",
  name: "Create a client",
  description: "Create a new Moxie Client",
  type: "action",
  version: "0.0.6",
  props: {
    moxie,
    clientName: {
      propDefinition: [
        moxie,
        "clientName",
      ],
    },
    clientType: {
      propDefinition: [
        moxie,
        "clientType",
      ],
    },
    initials: {
      propDefinition: [
        moxie,
        "initials",
      ],
    },
    currency: {
      propDefinition: [
        moxie,
        "currency",
      ],
    },
    address: {
      propDefinition: [
        moxie,
        "address",
      ],
    },
    stripeClientId: {
      propDefinition: [
        moxie,
        "stripeClientId",
      ],
    },
    contact: {
      propDefinition: [
        moxie,
        "contact",
      ],
    },
    clientNotes: {
      propDefinition: [
        moxie,
        "notes",
      ],
    },
    whoPaysCardFee: {
      propDefinition: [
        moxie,
        "whoPaysCardFee",
      ],
    },
  },
  methods: {
    getPaymentTerms(): PaymentTerms {
      const terms: PaymentTerms = {
        paymentDays: 0,
        latePaymentFee: 0,
        hourlyAmount: 0,
        whoPaysCardFees: undefined,
      };
      if (this.whoPaysCardFee) {
        terms.whoPaysCardFees = this.whoPaysCardFee;
      }
      return terms;
    },
    getContacts(): Contact[] {
      const contacts: Contact[] = [];
      if (this.contact) {
        contacts.push({
          firstName: this.contact.firstName,
          lastName: this.contact.lastName,
          email: this.contact.email,
          phone: this.contact.phone,
          defaultContact: Boolean(this.contact.defaultContact),
          invoiceContact: Boolean(this.contact.invoiceContact),
          portalAccess: Boolean(this.contact.portalAccess),
          role: this.contact.role,
          notes: this.contact.notes,
        });
      }
      return contacts;
    },
  },
  async run({ $ }) {
    const address: ClientAddress | undefined = this.address;
    const client: CreateClient = {
      name: this.clientName,
      clientType: this.clientType,
      initials: this.initials,
      currency: this.currency,
      stripeClientId: this.stripeClientId,
      address1: address?.address1,
      address2: address?.address2,
      country: address?.country,
      postal: address?.postal,
      city: address?.city,
      contacts: this.getContacts(),
      notes: this.clientNotes,
      paymentTerms: this.getPaymentTerms(),
    };
    const response = await this.moxie.createClient({
      $,
      client,
    });
    $.export("$summary", "Successfully retrieved clients.");
    $.export("url", this.moxie.clientUrl(response.id));
    return response;
  },
});
