export interface IPublicStats {
  users: {
    totalCitizens: number;
  };
  serviceRequests: {
    totalRequests: number;
    resolvedRequests: number;
  };
  categories: {
    totalCategories: number;
  };
}