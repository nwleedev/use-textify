export function getOAuth2RedirectURL(providerName: string) {
  switch (providerName) {
    case "google":
      return process.env.OAUTH2_GOOGLE_CALLBACK_URL;
    case "github":
      return process.env.OAUTH2_GITHUB_CALLBACK_URL;
    default:
      return null;
  }
}
