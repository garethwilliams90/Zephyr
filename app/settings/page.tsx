"use client"

import Link from "next/link"

export default function Settings() {
  return (
    <div className="h-screen">
      <Link
        className="btn btn-primary"
        href={"https://billing.stripe.com/p/login/test_aEUdUQgJv4Y98YEdQR"}
      >
        Customer Portal
      </Link>
    </div>
  )
}
