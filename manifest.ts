import { Manifest } from "deno-slack-sdk/mod.ts";
import { AddUserFunction } from "./functions/add_user.ts";


/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "slack-deno-app",
  description: "A blank template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  functions: [AddUserFunction],
  workflows: [],
  outgoingDomains: ["api.demojoyto.win"],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
