"use client"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="items-center justify-center z-0">
      <div className="tabs tabs-boxed">
        <a className="tab">Select an exercise</a>
        <a className="tab tab-active">Choose a time length</a>
        <a className="tab">Choose breathe length</a>
      </div>
      {children}
    </div>
  )
}
