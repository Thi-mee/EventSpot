function validateEventBody (body) {
  const { name, description, category, type, location, startDate, startTime, endDate, endTime, seats } = body;

  if (!name || !description || !category || !type || !startDate || !startTime || !endDate || !endTime || !seats) {
    return { success: false, message: 'Missing required fields' };
  }

  if (type !== 'online' && !location) {
    return { success: false, message: 'Missing required fields' };
  }

  return { success: true };

}


module.exports = {
  validateEventBody,
};