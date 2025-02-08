module.exports = {
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    query: {},
    pathname: '/',
    asPath: '/',
    isReady: true, // Simulate that the router is ready
  })),
};
