

export const QueryModels = {
  Companies: {
    QueryKey: "Company",
  },
  Items: {
    QueryKey: "Items",
    ApiEndpoint:"/api/root/dashboard/listOf/items/"
  },
  Clients: {
    QueryKey: "Clients",
     ApiEndpoint:"/api/root/dashboard/listOf/clients/"
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



