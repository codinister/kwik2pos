const durationCounter = (items) => {
  let durations = [];
  items.forEach((v, k) => {
    durations.push(v.duration);
  });

  const duration_count = durations.filter(Boolean).length;
  return duration_count;
};

export default durationCounter;
