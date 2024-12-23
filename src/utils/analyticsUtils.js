
import moment from "moment";

const getOsType = (userAgent) => {
  if (/windows/i.test(userAgent)) return "Windows";
  if (/macintosh/i.test(userAgent)) return "macOS";
  if (/linux/i.test(userAgent)) return "Linux";
  if (/android/i.test(userAgent)) return "Android";
  if (/iphone|ipod/i.test(userAgent)) return "iOS";
  return "Other";
};

const getDeviceType = (userAgent) => {
  if (/mobile/i.test(userAgent)) return "Mobile";
  return "Desktop";
};

const getClicksByDate = (analytics) => {
  const recent7Days = moment().subtract(7, "days").startOf("day");

  return analytics
    .filter(({ timestamp }) => moment(timestamp).isAfter(recent7Days))
    .reduce((acc, { timestamp }) => {
      const date = moment(timestamp).format("YYYY-MM-DD");
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
};

export { getOsType, getDeviceType, getClicksByDate };
