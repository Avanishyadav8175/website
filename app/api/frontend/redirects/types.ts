export type PermanentRedirect = {
  source: string;
  destination: string;
  permanent: true;
  statusCode: 301;
};
