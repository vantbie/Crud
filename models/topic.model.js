function createTopic(title) {
  return {
    id: Date.now(),
    title,
    votes: 0,
    links: []
  };
}
