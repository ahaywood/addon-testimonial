import { RequestInfo } from "rwsdk/worker";
import { BackButton } from "../../components/BackButton";
import { ManageNotifications } from "./components/ManageNotifications";
import { ManageTags } from "./components/ManageTags";

export const SettingsPage = async ({ ctx }: RequestInfo) => {
  return (
    <div>
      <BackButton />

      <div className="mb-10">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Manage configurations and settings</p>
      </div>

      <div className="flex flex-col gap-5">
        <ManageTags />

        <ManageNotifications />
      </div>
    </div>
  );
};
