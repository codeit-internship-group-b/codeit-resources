import AddCategoryButton from "../_components/AddCategoryButton";
import CategoryList from "../_components/CategoryList";

export default function Rooms(): JSX.Element {
  return (
    <section>
      <div className="flex justify-between">
        <h1>회의실 관리</h1>
        <AddCategoryButton />
      </div>
      <div className="mt-40">
        <CategoryList />
      </div>
    </section>
  );
}
