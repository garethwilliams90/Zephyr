"use client"

import StripePricingTables from "../shop/pricingTable"

export default function pricingOptions() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full flex justify-center">
        <div className="tabs tabs-boxed flex items-center justify-center w-1/3 ">
          <a className="tab">1 Year</a>
          <a className="tab tab-active">6 Months</a>
          <a className="tab">Monthly</a>
        </div>
      </div>
      <StripePricingTables />
    </div>
  )
}
