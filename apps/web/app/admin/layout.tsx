interface AdminLayout {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayout): JSX.Element {
  return <div className="px-118 text-custom-black mt-80">{children}</div>;
}
