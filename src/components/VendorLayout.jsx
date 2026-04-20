import VendorSidebar from "@/components/VendorSidebar";
import VendorTopbar from "@/components/VendorTopbar";

const VendorLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-secondary/40">
      <VendorSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <VendorTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default VendorLayout;
