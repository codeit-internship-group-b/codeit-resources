import AuthGuard from "./_components/AuthGuard";

export default function Home(): JSX.Element {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-16">
      <AuthGuard />
    </div>
  );
}
