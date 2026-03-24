"use client";

// import Sidebar from "@/app/component/sideBar/sidebar";
import styles from "./layout.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebarWrapper}>
        {/* <Sidebar /> */}
      </div>

      {/* Main */}
      <div className={styles.main}>{children}</div>
    </div>
  );
}