// // app/dashboard/page.jsx
// import Sidebar from "@/components/Sidebar";
// import Topbar from "@/components/Topbar";
// import StatsCards from "@/components/StatsCards";
// import DoctorsTable from "@/components/DoctorsTable";
// import RightPanel from "@/components/RightPanel";

// export default function DashboardPage() {
//   return (
//     <div className="flex bg-slate-900 min-h-screen text-white">
      
//       {/* SIDEBAR */}
//       <Sidebar />

//       {/* MAIN */}
//       <div className="flex-1 p-6">
//         <Topbar />
//         <StatsCards />

//         <div className="grid grid-cols-3 gap-6 mt-6">
//           <div className="col-span-2">
//             <DoctorsTable />
//           </div>

//           <RightPanel />
//         </div>
//       </div>
//     </div>
//   );
// }