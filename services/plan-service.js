import axios from 'axios';

class PlanService {
  constructor() {
    this.plansAPI = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true,
    })
  }

  getAllPlans() {
    return this.plansAPI.get('/plans')
      .then(({ data }) => data);
  }

  getOnePlan(planID) {
    return this.plansAPI.get(`/plans/${planID}`)
      .then(({ data }) => data);
  }
  
  addOnePlan(newPlan) {
    return this.plansAPI.post('/plans/create-plan', newPlan)
    .then(response => response)
  };
  
  valePlan(planID) {
    return this.plansAPI.put(`/plans/${planID}/vale`, planID)
    .then(response => response)
  };

  leavePlan(planID) {
    return this.plansAPI.put(`/plans/${planID}/leave`, planID)
    .then(response => response)
  };

  deletePlan(planID) {
    return this.plansAPI.put(`/plans/${planID}/delete`, planID)
    .then(response => response)
  };

  
  getAllCategories() {
    return this.plansAPI.get('/plans/categories')
      .then(({ data }) => data);
  }

  getOneCategory(category) {
    return this.plansAPI.get(`/plans/category/${category}`)
      .then(({ data }) => data);
  }

  searchPlans(planSearch) {
    return this.plansAPI.get(`/plans/search-plans?planSearch=${planSearch}`)
      .then(({ data }) => data);
  }


}

const plansAPI = new PlanService();

export default plansAPI