interface StatsCardProps {
 title: string;
 value: number;
 color: string;
}

export function StatsCard({
 title,
 value,
 color,
}: StatsCardProps) {
 return (
 <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">

 <div className="flex items-center justify-between">

 <div>
 <p className="text-sm font-medium text-gray-500">
 {title}
 </p>

 <h2 className="mt-2 text-3xl font-bold text-gray-900">
 {value}
 </h2>
 </div>

 <div
 className={`h-14 w-14 rounded-xl ${color} flex items-center justify-center text-xl font-bold text-white`}
 >
 {title.charAt(0)}
 </div>

 </div>
 </div>
 );
}

