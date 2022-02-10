import { Form } from "remix";

const NewJokeRoute = () => {
  return (
    <div>
      <p>Add your new hilarious joke</p>
      <Form>
        <div>
          <label>
            Name
            <input placeholder="Name of the joke"></input>
          </label>
        </div>
        <div>
          <label>
            Content
            <textarea placeholder="Content of the joke"></textarea>
          </label>
        </div>
        <button type="submit">Add</button>
      </Form>
    </div>
  );
};
export default NewJokeRoute;
