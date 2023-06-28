"use client"

import Link from "next/link"

export default function SubscribeStatButton() {
  return (
    <div className="my-10">
      <div className="stats bg-secondary text-primary-content shadow-xl">
        <div className="stat">
          <div className="stat-title text-black font-medium">
            Features Available
          </div>
          <div className="stat-value ">1/8</div>
          <div className="stat-actions">
            <Link
              href={"/pricingOptions"}
              className="btn btn-sm btn-accent shadow-lg"
            >
              Subscribe To Unlock All Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
