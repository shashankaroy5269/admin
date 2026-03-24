"use client";

import styles from "./sidebar.module.css";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className={styles.sidebar}>
      <div>
        <h2 className={styles.logo}>MediCore</h2>

        <ul className={styles.menu}>
          <li
            className={`${styles.menuItem} ${
              path === "/dashboard" ? styles.active : ""
            }`}
            onClick={() => router.push("/dashboard")}
          >
            <span className={styles.icon}>🏠</span> Dashboard
          </li>

          <li
            className={`${styles.menuItem} ${
              path === "/departments" ? styles.active : ""
            }`}
            onClick={() => router.push("/departments")}
          >
            <span className={styles.icon}>🏢</span> Departments
          </li>

          <li
            className={`${styles.menuItem} ${
              path === "/doctors" ? styles.active : ""
            }`}
            onClick={() => router.push("/doctors/list")}
          >
            <span className={styles.icon}>👨‍⚕️</span> Doctors
          </li>

          <li
            className={`${styles.menuItem} ${
              path === "/appointments" ? styles.active : ""
            }`}
            onClick={() => router.push("/appointments")}
          >
            <span className={styles.icon}>📅</span> Appointments
          </li>
        </ul>
      </div>

      <div
        className={styles.logout}
        onClick={() => {
          localStorage.clear();
          router.push("/auth/signin");
        }}
      >
        🚪 Logout
      </div>
    </div>
  );
}