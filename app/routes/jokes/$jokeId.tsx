import type { Joke } from "@prisma/client";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useCatch,
  useLoaderData,
  useParams,
} from "remix";
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

  if (!joke) {
    throw new Response("What a joke! Not found.", {
      status: 404,
    });
  }

  return joke;
};

export default function JokeRoute() {
  const joke = useLoaderData<Joke>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>
      <form method="post">
        <input type="hidden" name="id" value={joke.id} />
        <button className="button" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="error-container">
        <p>{caught.data}</p>
        Huh? What the heck is "{params.jokeId}"?
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary() {
  const { jokeId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
  );
}
