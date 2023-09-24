import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { HeaderResponsive } from "../components/layouts/header/header";

const routes = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Trade", link: "/trade" },
  { label: "WS", link: "/ws" },
  { label: "Chart", link: "/chart" },
];

export default function Root() {
  return (
    <AppShell
      padding="md"
      // navbar={
      //   <Navbar width={{ base: 300 }} height={500} p="xs">
      //     {/* Navbar content */}
      //   </Navbar>
      // }
      header={<HeaderResponsive key={"header"} links={routes} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          padding: 0,
          paddingTop: "calc(var(--mantine-header-height, 0px))",
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
