import type { Joke } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const id = form.get("id");
  if (typeof id !== "string") throw Error("Invalid id");
  await db.joke.delete({ where: { id } });
  return redirect("/jokes");
};

export const loader: LoaderFunction = async ({ params }) => {
  console.log(params);
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) throw new Error("Joke not found");
  return joke;
};

export default function JokeRoute() {
  const joke = useLoaderData<Joke>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>
      <form method="post">
        <input type="hidden" name="id" value={joke.id} readOnly />
        <button className="button" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}
