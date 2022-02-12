import type { ActionFunction } from "remix";
import { redirect } from "remix";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof name !== "string" || typeof content !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name, content };

  const joke = await db.joke.create({ data: fields });
  return redirect(`/jokes/${joke.id}`);
};

const NewJokeRoute = () => {
  return (
    <div>
      <p>Add your new hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name:
            <input type="text" name="name" placeholder="Name of the joke"></input>
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea name="content" placeholder="Content of the joke"></textarea>
          </label>
        </div>
        <button className="button" type="submit">Add</button>
      </form>
    </div>
  );
};
export default NewJokeRoute;
