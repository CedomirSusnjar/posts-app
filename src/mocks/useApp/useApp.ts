module.exports = {
  useApp: jest.fn(() => ({
    incrementFavouritePostsNumber: jest.fn(),
    setFavouritePostsNumberHandler: jest.fn(),
  })),
};
