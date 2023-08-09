export default function NavDrawer() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 lg:w-12 rounded-full">
          <Image
            src={session.user?.image as string}
            alt={session.user.name as string}
            width={36}
            height={36}
            className="rounded-full"
            tabIndex={0}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg  bg-base-300 rounded-box w-48 md:w-64 lg:w-64 border-gray-600 border"
      >
        <li>
          <Link
            href={"/exerciseHistory"}
            onClick={() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur()
              }
            }}
          >
            History
          </Link>
        </li>
        {/* <li>
  <Link href={"/shop"}>Shop</Link>
</li> */}
        <li>
          <Link href={"/profile"}>
            <h3 className="justify-between">
              Profile
              <span className="badge mx-2 ">New</span>
            </h3>
          </Link>
        </li>
        {/* <li>
  <Link href={"/settings"}>Settings</Link>
</li> */}
        <li>
          <Link href={"/leaderboard"}>
            <h3 className="justify-between">
              Leaderboard
              <span className="badge mx-2 ">New</span>
            </h3>
          </Link>
        </li>
        <li
          onClick={() => {
            signOut()
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }
          }}
        >
          <h3>Sign out</h3>
        </li>
      </ul>
    </div>
  )
}
