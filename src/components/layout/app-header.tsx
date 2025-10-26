import { UserNav } from "@/components/user-nav";
import { StockTicker } from "./stock-ticker";


export function AppHeader() {
  return (
    <>
      <div className="w-full flex-1 overflow-x-hidden">
        <StockTicker />
      </div>
      <UserNav />
    </>
  );
}
