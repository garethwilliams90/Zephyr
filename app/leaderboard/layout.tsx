export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" w-auto p-4 text-lg lg:text-2xl font-bold text-primary rounded-xl">
        Leaderboard
      </div>
      {children}
    </div>
  )
}
