import { TDrawerItem, TUserRoles } from "@/types";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import BloodtypeRoundedIcon from "@mui/icons-material/BloodtypeRounded";
import MedicationLiquidRoundedIcon from "@mui/icons-material/MedicationLiquidRounded";
import DomainAddRoundedIcon from "@mui/icons-material/DomainAddRounded";
import AirportShuttleRoundedIcon from "@mui/icons-material/AirportShuttleRounded";

export const generateDrawerItems = (roles: TUserRoles[]): TDrawerItem[] => {
  const roleMenus: TDrawerItem[] = [];


  if (roles?.includes("admin")) {
    roleMenus.push(
      {
        title: "Home",
        path: `admin/home`,
        icon: DashboardOutlinedIcon,
      },
      {
        title: "Profile",
        path: `admin/profile`,
        icon: AccountBoxIcon,
      },
      {
        title: "Users",
        path: `admin/manage-users`,
        icon: PeopleAltRoundedIcon,
      },
      {
        title: "Doctor Consultations",
        path: `admin/manage-consultations`,
        icon: MedicalServicesRoundedIcon,
      },
      {
        title: "Blood Donations",
        path: `admin/manage-blood-donations`,
        icon: BloodtypeRoundedIcon,
      },
      {
        title: "Pharmacy",
        path: `admin/manage-pharmacy`,
        icon: MedicationLiquidRoundedIcon,
      },
      {
        title: "Hospitals",
        path: `admin/manage-hospitals`,
        icon: DomainAddRoundedIcon,
      },
      {
        title: "Ambulance",
        path: `admin/manage-ambulance`,
        icon: AirportShuttleRoundedIcon,
      },
      {
        title: "Change Password",
        path: `admin/change-password`,
        icon: KeyRoundedIcon,
    },
    );
  }

  if (roles?.includes("super_admin")) {
    roleMenus.push(
      {
        title: "Profile",
        path: `super_admin/profile`,
        icon: AccountBoxIcon,
      },
      {
        title: "Manage Users",
        path: `super_admin/manage-users`,
        icon: AccountBoxIcon,
      }
    );
  }

  if (roles?.includes("user")) {
    roleMenus.push(
      {
        title: "Dashboard",
        path: `user`,
        icon: DashboardOutlinedIcon,
      },
      {
        title: "Profile",
        path: `user/profile`,
        icon: AccountBoxIcon,
      },
      {
        title: "Sent Blood Requests",
        path: `user/sent-requests`,
        icon: SendRoundedIcon,
      },
      {
        title: "Received Blood Requests",
        path: `user/received-requests`,
        icon: MessageOutlinedIcon,
      }
    );
  }

  return roleMenus;
};
