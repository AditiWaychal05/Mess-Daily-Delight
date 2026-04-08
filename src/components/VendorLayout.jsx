import VendorSidebar from "@/components/VendorSidebar";

const VendorLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <VendorSidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default VendorLayout;
