"use client"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="tems-center justify-center">
      <ul className="w-full font-medium bg-base rounded-full steps gap-8 py-4 px-2">
        <li className="step step-accent">Pick an exercise</li>
        <li className="step step-accent">Set a time length</li>
        <li className="step">Set an exhale time</li>
        <li className="step">Start breathing</li>
      </ul>
      {children}
    </div>
  )
}
