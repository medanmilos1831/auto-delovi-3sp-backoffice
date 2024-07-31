const API_DOMAIN = {
  PROGRAM: 'program_bo',
  CATEGORY: 'category_bo',
  PRODUCT: 'product',
  ABOUT: '/about',
  CONTACT: '/contact_bo',
  HOME: '/home_bo',
};
export const API_ROUTES = {
  PROGRAM: {
    ALL: `${API_DOMAIN.PROGRAM}/all`,
    CREATE: `${API_DOMAIN.PROGRAM}/create`,
    UPDATE: `${API_DOMAIN.PROGRAM}/update`,
    REMOVE: `${API_DOMAIN.PROGRAM}/remove`,
  },
  CATEGORY: {
    ALL: `${API_DOMAIN.CATEGORY}/all`,
    CREATE: `${API_DOMAIN.CATEGORY}/create`,
    UPDATE: `${API_DOMAIN.CATEGORY}/update`,
    REMOVE: `${API_DOMAIN.CATEGORY}/remove`,
    GET_PROGRAM_CATEGORIES: `${API_DOMAIN.CATEGORY}/categories_by_program`,
  },
  PRODUCT: {
    ALL: `${API_DOMAIN.PRODUCT}/all`,
    CREATE: `${API_DOMAIN.PRODUCT}/create`,
    UPDATE: `${API_DOMAIN.PRODUCT}/update`,
    REMOVE: `${API_DOMAIN.PRODUCT}/remove`,
  },
  CONTACT: {
    BASE: `${API_DOMAIN.CONTACT}`,
  },
  ABOUT: {
    BASE: `${API_DOMAIN.ABOUT}`,
  },
  HOME: {
    BASE: `${API_DOMAIN.HOME}`,
  },
};

// export const API = 'http://localhost:3000';
// export const API = "https://api.auto-delovi-3sp.com/",
