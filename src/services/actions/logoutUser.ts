import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { removeUserInfo } from "../auth.services";

export const logoutUser = (router: AppRouterInstance) => {
  removeUserInfo();
  router.push("/login");
  router.refresh();
};
