import { Registration } from "../../pages/AdminDashboard";
import { StatusBadge } from "./StatusBadge";

interface Props {
 registrations: Registration[];
 loading: boolean;
 onConfirm: (id: string) => void;
 onReject: (id: string) => void;
}

export function RegistrationTable({
 registrations,
 loading,
 onConfirm,
 onReject,
}: Props) {
 if (loading) {
 return (
 <div className="rounded-xl bg-white p-10 text-center shadow">
 Loading registrations...
 </div>
 );
 }

 if (registrations.length === 0) {
 return (
 <div className="rounded-xl bg-white p-10 text-center shadow">
 No registrations found.
 </div>
 );
 }

 return (
 <div className="overflow-x-auto rounded-xl bg-white shadow">

 <table className="min-w-full">

 <thead className="bg-gray-100">

 <tr>

 <th className="px-5 py-4 text-left">Name</th>

 <th className="px-5 py-4 text-left">Mobile</th>

 <th className="px-5 py-4 text-left">Gender</th>

 <th className="px-5 py-4 text-left">Level</th>

 <th className="px-5 py-4 text-left">UTR</th>

 <th className="px-5 py-4 text-left">Status</th>

 <th className="px-5 py-4 text-left">Date</th>

 <th className="px-5 py-4 text-center">Actions</th>

 </tr>

 </thead>

 <tbody>

 {registrations.map((registration) => (

 <tr
 key={registration.id}
 className="border-t hover:bg-gray-50"
 >

 <td className="px-5 py-4 font-medium">
 {registration.name}
 </td>

 <td className="px-5 py-4">
 {registration.mobile}
 </td>

 <td className="px-5 py-4">
 {registration.gender}
 </td>

 <td className="px-5 py-4">
 {registration.level}
 </td>

 <td className="px-5 py-4 font-mono">
 {registration.utr}
 </td>

 <td className="px-5 py-4">
 <StatusBadge status={registration.payment_status} />
 </td>

 <td className="px-5 py-4">
 {new Date(registration.created_at).toLocaleString()}
 </td>

 <td className="px-5 py-4">

 {registration.payment_status === "pending" ? (

 <div className="flex gap-2 justify-center">

 <button
 onClick={() => onConfirm(registration.id)}
 className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
 >
 Confirm
 </button>

 <button
 onClick={() => onReject(registration.id)}
 className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
 >
 Reject
 </button>

 </div>

 ) : (

 <span className="text-gray-400">
 Completed
 </span>

 )}

 </td>

 </tr>

 ))}

 </tbody>

 </table>

 </div>
 );
}

