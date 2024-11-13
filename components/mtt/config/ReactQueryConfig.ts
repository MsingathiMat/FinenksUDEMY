

export const QueryModels = {
  Companies: {
    QueryKey: "Company",
  },
  Items: {
    QueryKey: "Items",
  },
  Clients: {
    QueryKey: "Clients",
  },
  Quotations: {
    QueryKey: "Quotations",
  },
  QuotationById: {
    QueryKey: "QuotationById",
  },
  UserCompany: {
    QueryKey: "UserCompany",
  },
};

export const MutationModels = {
  Companies: {
    MutationKey: "mtCompany",
    Dependants:[QueryModels.Companies.QueryKey],
  },
  Items: {
    MutationKey: "mtItems",
    Dependants: QueryModels.Items.QueryKey,
  },
  Clients: {
    MutationKey: "mtClients",
    Dependants: QueryModels.Clients.QueryKey,
  },
  Quotations: {
    MutationKey: "mtQuotations",
    Dependants: [QueryModels.Quotations.QueryKey,QueryModels.QuotationById.QueryKey],
  },
  QuotationChat: {
    MutationKey: "mtQuotationChat",
    Dependants: [QueryModels.Quotations.QueryKey,QueryModels.QuotationById.QueryKey],
  },
 
};



