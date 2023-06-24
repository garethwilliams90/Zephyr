export default function StripePricingTables() {
  return (
    <div>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        pricing-table-id="prctbl_1NMTEMEVdSKivasiQGnDL8pd"
        publishable-key="pk_test_51NDtbxEVdSKivasiqELIrSuBJ3qO21B30OAK2dYOIUcscZOFooegImirwdiMLoovETi3zSMjbbXub0CPmo1iDdiI00WluByCKu"
      ></stripe-pricing-table>
    </div>
  )
}
