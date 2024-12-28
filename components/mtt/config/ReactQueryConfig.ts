

const aggregateEndpoint="/api/root/dashboard/aggregates/totalRecords/"
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
  aggregates:{
    TotalQuotes:{
      QueryKey: "TotalQuotes",
       ApiEndpoint:aggregateEndpoint
    },
    TotalClients:{
      QueryKey: "TotalClients",
       ApiEndpoint:aggregateEndpoint
    },
    TotalItems:{
      QueryKey: "TotalItems",
       ApiEndpoint:aggregateEndpoint
    },
    TotalUsers:{
      QueryKey: "TotalUsers",
       ApiEndpoint:aggregateEndpoint
    }
  }
};

export const MutationModels = {
  FieldUpdater: {
    MutationKey: "mtFieldUpdater",
    ApiEndpoint:"/api/FieldUpdater/"
  },
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



