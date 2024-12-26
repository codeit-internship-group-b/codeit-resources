import CategoryList from "../_components/CategoryList";
import ItemsAdminHeader from "../_components/ItemsAdminHeader";

export default function Rooms(): JSX.Element {
  return (
    <section>
      <ItemsAdminHeader />
      <div className="mt-40">
        <CategoryList />
      </div>
    </section>
  );
}
