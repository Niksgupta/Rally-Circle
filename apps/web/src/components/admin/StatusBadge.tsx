interface Props {
 status: "pending" | "confirmed" | "rejected";
}

export function StatusBadge({ status }: Props) {
 let classes = "";
 let text = "";

 switch (status) {
 case "pending":
 classes = "bg-yellow-100 text-yellow-800";
 text = "Pending";
 break;

 case "confirmed":
 classes = "bg-green-100 text-green-800";
 text = "Confirmed";
 break;

 case "rejected":
 classes = "bg-red-100 text-red-800";
 text = "Rejected";
 break;

 default:
 classes = "bg-gray-100 text-gray-700";
 text = status;
 }

 return (
 <span
 className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
 >
 {text}
 </span>
 );
}

