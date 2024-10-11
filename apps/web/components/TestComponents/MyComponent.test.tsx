import * as renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <div>
        <h2>hello world</h2>
      </div>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
