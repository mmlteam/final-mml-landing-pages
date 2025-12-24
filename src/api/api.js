import axios from "axios";

// const { REACT_APP_API_URL } = process.env;

const apiUrl = "https://api.mmlprojects.in";

// home page tagline data
export const getHome_tagline_Data = async () => {
  const resp = await axios.get(
    `${apiUrl}/home_data.php?home_category=home_tagline_data`
  );
  return resp.data;
};

// home page home_featured_crousel_data
export const getHome_featured_carousel_Data = async () => {
  const resp = await axios.get(
    `${apiUrl}/home_data.php?home_category=home_featured_crousel_data`
  );
  return resp.data;
};

// home page our services data
export const getHome_Service_Data = async () => {
  const resp = await axios.get(
    `${apiUrl}/home_data.php?home_category=home_service_data`
  );
  return resp.data;
};

// home page upgrade data
export const getHome_upgrade_Data = async () => {
  const resp = await axios.get(
    `${apiUrl}/home_data.php?home_category=home_upgrade_data`
  );
  return resp.data;
};

// home page brands client logo data
export const gethome_brands_data = async () => {
  const resp = await axios.get(
    `${apiUrl}/home_data.php?home_category=home_brands_data`
  );
  return resp.data;
};

// home page testimonial data
export const gethome_testimonial_data = async () => {
  const resp = await axios.get(
    `${apiUrl}/home_data.php?home_category=home_testimonials_data`
  );
  return resp.data;
};

// service page data
export const getServiceData = async () => {
  const resp = await axios.get(`${apiUrl}/service_data.php`);
  return resp.data;
};

// upgrade page data
export const getUpgradeData = async () => {
  const resp = await axios.get(`${apiUrl}/upgrade_data.php`);
  return resp.data;
};

// work page portfolio data

export const PortfolioAllData = async () => {
  const resp = await axios.get(
    "https://api.mmlprojects.in/work_portfolio_data.php"
  );
  return resp.data;
};

// work page portfolio navigation

export const PortfolioNavigation = async () => {
  const resp = await axios.get(
    `https://api.mmlprojects.in/work_master_data.php`
  );
  return resp.data;
};

// work page client carousel
export const ClientCarousel = async () => {
  const resp = await axios.get(
    `https://api.mmlprojects.in/work_logo_crousel_data.php`
  );
  return resp.data;
};

// About us our all star team Data
export const OurStarTeam = async () => {
  const resp = await axios.get(`https://api.mmlprojects.in/aboutus_data.php`);
  return resp.data;
};
