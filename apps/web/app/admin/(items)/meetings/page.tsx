import AddCategoryButton from "../_components/AddCategoryButton";
import CategoryList from "../_components/CategoryList";

export default function Rooms(): JSX.Element {
  return (
    <section>
      <div>
        <h1>회의실 관리</h1>
      </div>
      <div className="mt-40">
        <CategoryList />
      </div>
      <hr className="border-1 my-24 border-solid border-gray-100" />
      <div>
        <AddCategoryButton />
      </div>
    </section>
  );
}
