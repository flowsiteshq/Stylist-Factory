/**
 * AdminGeneric - Generic placeholder for admin pages not yet fully implemented
 */
import AdminLayout from "@/components/AdminLayout";
import { Construction } from "lucide-react";

interface AdminGenericProps {
  title: string;
  description?: string;
}

export default function AdminGeneric({ title, description }: AdminGenericProps) {
  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-20">
          <Construction className="w-12 h-12 text-gray-200 mb-4" />
          <h3 className="text-base font-semibold text-gray-600">{title} Management</h3>
          <p className="text-sm text-gray-400 mt-1 text-center max-w-sm">
            This section is being built. Full CRUD functionality will be available here.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
