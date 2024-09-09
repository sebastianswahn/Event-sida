export const checkIfBooked = async (
  isLoaded,
  isSignedIn,
  user,
  userId,
  events,
  updateUsers
) => {
  if (isLoaded && isSignedIn && user && userId) {
    const bookedEventIds = [];
    for (const event of events) {
      const response = await updateUsers("events", event.id, userId);
      if (
        response.success === false &&
        response.message === "User already booked this event"
      ) {
        bookedEventIds.push(event.id);
      }
    }
    return bookedEventIds;
  }
  return [];
};
