import AddCategoryButton from "./_components/AddCategoryButton";
import CategoryList from "./_components/CategoryList";

export default function RoomsPage(): JSX.Element {
  return (
    <section className="md:mt-80">
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
