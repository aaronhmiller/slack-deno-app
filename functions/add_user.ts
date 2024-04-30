import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

// The metadata definition for the add_user function
export const AddUserFunction = DefineFunction({
  callback_id: "add_user",
  title: "Add User",
  description: "Add User using Crud-App's API",
  source_file: "./functions/add_user.ts",
  input_parameters: {
    properties: {
      name: { type: Schema.types.string },
      email: { type: Schema.types.string },
    },
    required: ["name", "email"],
  },
  output_parameters: {
    properties: { result: { type: Schema.types.string } },
    required: ["result"],
  },
});

export default SlackFunction(AddUserFunction, async ({ inputs }) => {
  // Build an HTTP request Crud-App's API
  const apiUrl = `https://api.demojoyto.win/users`;
  const body = new URLSearchParams();
  body.append("name", inputs.name);
  body.append("email", inputs.email);
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
  });
  const status = response.status;
  if (status != 201) {
    const body = await response;
    const error = `API error (status: ${status}, body: ${body})`;
    return { error };
  }
  const result = await response.text();
  if (!result || result.length === 0) {
    const error = `User add failed: ${result}`;
    return { error };
  }
  return { outputs: { result: result } };
});
