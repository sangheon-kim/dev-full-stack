export const SERVER_URL: { [key: string]: string } = {
  dummy:
    process.env.NODE_ENV === "development"
      ? "https://jsonplaceholder.typicode.com" // 개발모드의 경우 정적 URL
      : "https://jsonplaceholder.typicode.com", // 운영모드일 경우 정적 URL
};
