import DashboardProvider from "./_components/DashboardProvider";

export default function Dashboard(): JSX.Element {
  return (
    <div className="text-custom-black mx-16 mt-40 flex flex-col gap-80 md:m-80">
      <DashboardProvider />
    </div>
  );
}
