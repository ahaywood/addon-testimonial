import { layout, route } from "rwsdk/router";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { FormPage } from "./pages/Form/FormPage";
import { SettingsPage } from "./pages/Settings/SettingsPage";
import { TestimonialsPage } from "./pages/Testimonials/TestimonialsPage";
import { NewPage } from "./pages/New/NewPage";
import { Layout } from "./pages/Layout";
import { WallPage } from "./pages/Wall/WallPage";
import { EditPage } from "./pages/Edit/EditPage";

export const adminRoutes = layout(Layout, [
  route("/", DashboardPage),
  route("/new", NewPage),
  route("/edit", EditPage),
  route("/all", TestimonialsPage),
  route("/settings", SettingsPage),
]);

export const publicRoutes = [
  route("/form", FormPage),
  route("/wall", WallPage),
];
