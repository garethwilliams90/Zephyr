export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="items-center justify-center z-0 p-4">{children}</div>
}
