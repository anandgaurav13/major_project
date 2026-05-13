export function searchCampus(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("library")) {
    return "Central Library is near the academic core; use Campus Map → Library for walking directions.";
  }
  if (q.includes("hostel")) {
    return "Hostels including Ashoka Boys Hostel are marked on the map near the residential zone.";
  }
  if (q.includes("cse") || q.includes("computer") || q.includes("uiet")) {
    return "CSE and UIET are in the Engineering / UIET block on the campus map.";
  }
  if (q.includes("gate") || q.includes("main gate")) {
    return "Main Gate is the primary campus entrance on Raebareli Road side.";
  }
  if (q.includes("bus") || q.includes("shuttle")) {
    return "See Bus Schedule for Route A (main loop) and Route C (hostel shuttle).";
  }
  return "No exact match. Try keywords like library, hostel, UIET, or browse the Campus Map.";
}
