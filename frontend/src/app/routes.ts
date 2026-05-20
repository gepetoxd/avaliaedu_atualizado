import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { QuestionBankPage } from "./pages/QuestionBankPage";
import { SkillsPage } from "./pages/SkillsPage";
import { ExamGeneratorPage } from "./pages/ExamGeneratorPage";
import { ExamLibraryPage } from "./pages/ExamLibraryPage";
import { ScanExamsPage } from "./pages/ScanExamsPage";
import { CorrectionResultsPage } from "./pages/CorrectionResultsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { StudentsPage } from "./pages/StudentsPage";
import { ClassesPage } from "./pages/ClassesPage";
import { SchoolsPage } from "./pages/SchoolsPage";
import { AdminPanelPage } from "./pages/AdminPanelPage";
import { UserManagementPage } from "./pages/UserManagementPage";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "question-bank", Component: QuestionBankPage },
      { path: "skills", Component: SkillsPage },
      { path: "exam-generator", Component: ExamGeneratorPage },
      { path: "exam-library", Component: ExamLibraryPage },
      { path: "scan-exams", Component: ScanExamsPage },
      { path: "correction-results", Component: CorrectionResultsPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "students", Component: StudentsPage },
      { path: "classes", Component: ClassesPage },
      { path: "schools", Component: SchoolsPage },
      { path: "admin", Component: AdminPanelPage },
      { path: "users", Component: UserManagementPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
