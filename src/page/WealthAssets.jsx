import AssetAllocation from "../components/AssetAllocation"
import AssetLedger from "../components/AssetLedger"
import LiabilitiesList from "../components/LiabilitiesList"
import LiabilityAllocation from "../components/LiabilityAllocation"

const WealthAssets = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "32px" }}>
                <AssetLedger />
                <AssetAllocation />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "32px" }}>
                <LiabilitiesList />
                <LiabilityAllocation />
            </div>
        </div>
    )
}
export default WealthAssets
