import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminProtectedRoute } from "@/components/admin-protected-route"

export default function AdminPage() {
  return (
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  )
}
