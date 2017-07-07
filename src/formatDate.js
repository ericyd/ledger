const formatDate = (d = new Date(), includeTimestamp = false) => {
  if (typeof d === 'string') d = new Date(d);
  // month is 0-indexed, need to be padded
  const month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const year = d.getFullYear();
  const hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  const ampm = d.getHours() > 12 ? 'pm' : 'am';
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return includeTimestamp
    ? `${month}-${day}-${year} ${hours}:${minutes}:${seconds} ${ampm}`
    : `${month}-${day}-${year}`;
};

module.exports = formatDate;
