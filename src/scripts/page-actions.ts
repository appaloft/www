import "./home-actions";

const authWidget = document.querySelector<HTMLElement>("[data-auth-widget]");

if (authWidget?.dataset.authGithubConfigured === "true") {
  void import("./auth-widget");
}
