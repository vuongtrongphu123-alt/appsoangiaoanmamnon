import React, { useState, useEffect } from 'react';
import { TabId, LessonPlan, UserProfile } from './types';
import { SAMPLE_LESSONS } from './data/constants';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { Toast, ToastData } from './components/Toast';

import { DashboardTab } from './tabs/DashboardTab';
import { CreateLessonTab } from './tabs/CreateLessonTab';
import { AuditTab } from './tabs/AuditTab';
import { LibraryTab } from './tabs/LibraryTab';
import { GamesTab } from './tabs/GamesTab';
import { MaterialsTab } from './tabs/MaterialsTab';
import { PowerPointTab } from './tabs/PowerPointTab';
import { AssistantTab } from './tabs/AssistantTab';
import { DocumentsTab } from './tabs/DocumentsTab';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>({
    name: 'Cô Giáo Nguyễn Mai Lan',
    email: 'lan.nguyen@mamnon.edu.vn',
    school: 'Trường MN Sơn Đồng 3',
    className: 'Lớp Mẫu giáo 4-5 tuổi B5',
    academicYear: '2026–2027',
  });

  const [currentTab, setCurrentTab] = useState<TabId>('dashboard');
  const [savedPlans, setSavedPlans] = useState<LessonPlan[]>([]);
  const [currentEditingPlan, setCurrentEditingPlan] = useState<LessonPlan | null>(null);
  const [auditText, setAuditText] = useState<string>('');
  const [auditAge, setAuditAge] = useState<string>('Mẫu giáo 4-5 tuổi');
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Initialize data on mount
  useEffect(() => {
    // Check user auth
    const savedUserEmail = localStorage.getItem('MN_CURRENT_USER');
    if (savedUserEmail) {
      const storedName = localStorage.getItem('MN_TEACHER_NAME') || 'Cô Giáo Nguyễn Mai Lan';
      const storedSchool = localStorage.getItem('MN_TEACHER_SCHOOL') || 'Trường MN Sơn Đồng 3';
      const storedClass = localStorage.getItem('MN_TEACHER_CLASS') || 'Lớp Mẫu giáo 4-5 tuổi B5';
      setUser({
        name: storedName,
        email: savedUserEmail,
        school: storedSchool,
        className: storedClass,
        academicYear: '2026–2027',
      });
      setIsAuthenticated(true);
    }

    // Load lesson library
    try {
      const storedPlans = localStorage.getItem('MN_LESSON_LIBRARY_2026_V2');
      if (storedPlans) {
        const parsed = JSON.parse(storedPlans);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedPlans(parsed);
        } else {
          setSavedPlans(SAMPLE_LESSONS);
          localStorage.setItem('MN_LESSON_LIBRARY_2026_V2', JSON.stringify(SAMPLE_LESSONS));
        }
      } else {
        // Upgrade from old cache: update sample templates to new vertical and continuous 2-column layout
        const oldPlans = localStorage.getItem('MN_LESSON_LIBRARY_2026');
        if (oldPlans) {
          try {
            const oldParsed: LessonPlan[] = JSON.parse(oldPlans);
            const sampleIds = new Set(SAMPLE_LESSONS.map((s) => s.id));
            const userCreated = oldParsed.filter((p) => !sampleIds.has(p.id));
            const merged = [...SAMPLE_LESSONS, ...userCreated];
            setSavedPlans(merged);
            localStorage.setItem('MN_LESSON_LIBRARY_2026_V2', JSON.stringify(merged));
          } catch {
            setSavedPlans(SAMPLE_LESSONS);
            localStorage.setItem('MN_LESSON_LIBRARY_2026_V2', JSON.stringify(SAMPLE_LESSONS));
          }
        } else {
          setSavedPlans(SAMPLE_LESSONS);
          localStorage.setItem('MN_LESSON_LIBRARY_2026_V2', JSON.stringify(SAMPLE_LESSONS));
        }
      }
    } catch {
      setSavedPlans(SAMPLE_LESSONS);
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToast({
      id: Date.now().toString(),
      message,
      type,
    });
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('MN_CURRENT_USER');
    setIsAuthenticated(false);
    showToast('Đã đăng xuất tài khoản thành công!', 'info');
  };

  const handleSavePlan = (plan: LessonPlan) => {
    setSavedPlans((prev) => {
      const exists = prev.findIndex((p) => p.id === plan.id);
      let updated: LessonPlan[];
      if (exists >= 0) {
        updated = [...prev];
        updated[exists] = plan;
      } else {
        updated = [plan, ...prev];
      }
      localStorage.setItem('MN_LESSON_LIBRARY_2026_V2', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeletePlan = (id: string) => {
    setSavedPlans((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('MN_LESSON_LIBRARY_2026_V2', JSON.stringify(updated));
      return updated;
    });
    showToast('Đã xóa giáo án khỏi kho lưu trữ!', 'info');
  };

  const handleOpenPlanInEditor = (plan: LessonPlan) => {
    setCurrentEditingPlan(plan);
    setCurrentTab('create');
    showToast(`Đã mở giáo án: ${plan.title}`, 'info');
  };

  const handleNewPlan = () => {
    setCurrentEditingPlan(null);
    setCurrentTab('create');
  };

  const handleSendToAudit = (text: string, age: string) => {
    setAuditText(text);
    setAuditAge(age);
    setCurrentTab('check');
    showToast('Đã chuyển nội dung giáo án sang bộ thẩm định!', 'info');
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setUser(updated);
    localStorage.setItem('MN_TEACHER_NAME', updated.name);
    localStorage.setItem('MN_TEACHER_SCHOOL', updated.school);
    localStorage.setItem('MN_TEACHER_CLASS', updated.className);
    showToast('Đã cập nhật thông tin cô giáo thành công!', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f9] text-[#152238] antialiased font-sans">
      {/* Auth Modal if not authenticated */}
      {!isAuthenticated && (
        <AuthModal onLoginSuccess={handleLoginSuccess} onToast={showToast} />
      )}

      {/* Profile Modal */}
      <ProfileModal
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* Toast notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          libraryCount={savedPlans.length}
          user={user}
          onOpenProfile={() => setIsProfileOpen(true)}
          onLogout={handleLogout}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header
            currentTab={currentTab}
            academicYear={user.academicYear}
            onToggleSidebar={() => setMobileSidebarOpen(true)}
            onNewPlan={handleNewPlan}
          />

          {/* Tab Views */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f0f4f9]">
            {currentTab === 'dashboard' && (
              <DashboardTab
                onSwitchTab={setCurrentTab}
                savedPlans={savedPlans}
                onOpenPlanInEditor={handleOpenPlanInEditor}
              />
            )}

            {currentTab === 'create' && (
              <CreateLessonTab
                user={user}
                currentEditingPlan={currentEditingPlan}
                onSavePlan={handleSavePlan}
                onSendToAudit={handleSendToAudit}
                onToast={showToast}
              />
            )}

            {currentTab === 'check' && (
              <AuditTab
                initialText={auditText}
                initialAge={auditAge}
                onToast={showToast}
              />
            )}

            {currentTab === 'library' && (
              <LibraryTab
                plans={savedPlans}
                onOpenPlan={handleOpenPlanInEditor}
                onDeletePlan={handleDeletePlan}
                onToast={showToast}
              />
            )}

            {currentTab === 'games' && <GamesTab onToast={showToast} />}

            {currentTab === 'materials' && <MaterialsTab />}

            {currentTab === 'powerpoint' && (
              <PowerPointTab
                currentTopic={currentEditingPlan?.title || 'Đếm đến 5 và nhận biết số 5'}
                onToast={showToast}
              />
            )}

            {currentTab === 'assistant' && <AssistantTab />}

            {currentTab === 'documents' && <DocumentsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
