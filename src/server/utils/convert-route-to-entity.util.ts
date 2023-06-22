const mapping: Record<string, string> = {
  hotels: 'hotel',
  reservations: 'reservation',
  rooms: 'room',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
