exports.generateID = () => {
  const timestamp = new Date().getTime().toString(); // get current timestamp as string
  const random = Math.random().toString().substr(2, 5); // generate a random string of length 5
  const userId = timestamp + random; // concatenate the timestamp and random strings
  return userId;
};
exports.isMoreThan30MinutesAgo = (timestamp) => {
  const currentTimestamp = Date.now();
  const givenTimestamp = parseInt(timestamp);

  if (isNaN(givenTimestamp)) {
    throw new Error("Invalid timestamp");
  }

  const elapsedMinutes = Math.floor(
    (currentTimestamp - givenTimestamp) / (1000 * 60)
  );

  if (elapsedMinutes > 30) {
    const date = new Date(givenTimestamp);
    return {
      isMoreThan30MinutesAgo: true,
      humanReadableDate: date.toString(),
    };
  }

  return {
    isMoreThan30MinutesAgo: false,
    humanReadableDate: "",
  };
};
