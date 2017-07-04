const formatDate = (d = new Date(), includeTimestamp = false) => {
  // month is 0-indexed, need to be padded
  const month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const year = d.getFullYear();
  const hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  const ampm = d.getHours() > 12 ? 'pm' : 'am';
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return includeTimestamp
    ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`
    : `${year}-${month}-${day}`;
};

module.exports = formatDate;
