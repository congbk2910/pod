import { useQuery } from "react-query";
import { useApi } from "./api";

const baseUrl = "/catalog";

export const useFetchProducts = (filters) => {
  const api = useApi();

  const fetchProducts = async () => {
    try {
      let url = "";
      if (filters.length) {
        let params = "";
        filters.forEach((filter, index) => {
          if (filter.key === "link") {
            url = filter.value;
          } else if (index === 0) {
            params += `${filter.key}=${filter.value}`;
          } else {
            params += `&${filter.key}=${filter.value}`;
          }
        });
        if (!url) url = `${baseUrl}?${params}`;
      } else {
        url = baseUrl;
      }

      const { data } = await api.get(url);

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return useQuery(["products", { filters }], fetchProducts);
};

export const useFetchCategories = (filters) => {
  const api = useApi();

  const fetchCategories = async () => {
    try {
      let url = "";
      if (filters.length) {
        let params = "";
        filters.forEach((filter, index) => {
          if (filter.key === "link") {
            url = filter.value;
          } else if (index === 0) {
            params += `${filter.key}=${filter.value}`;
          } else {
            params += `&${filter.key}=${filter.value}`;
          }
        });
        if (!url) url = `${baseUrl + "/categories"}?${params}`;
      } else {
        url = baseUrl + "/categories";
      }

      const { data } = await api.get(url);

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return useQuery(["categories", { filters }], fetchCategories);
};

export const formatURl = (filters) => {
  let url = "";
  if (filters.length) {
    let params = "";
    filters.forEach((filter, index) => {
      if (filter.key === "link") {
        url = filter.value;
      } else if (index === 0) {
        params += `${filter.key}=${filter.value}`;
      } else {
        params += `&${filter.key}=${filter.value}`;
      }
    });
    if (!url) url = `${baseUrl + "/categories"}?${params}`;
  } else {
    url = baseUrl + "/categories";
  }

  return url;
};
