<template>
  <div class="workbench-container">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="sidebar-header">
        <span class="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </span>
        <div class="logo-content" v-if="!isCollapsed">
          <span class="logo-text">仲裁智能化工作台</span>
        </div>
      </div>
      
      <nav class="sidebar-menu">
        <router-link to="/filing-review" class="menu-item" active-class="active">
          <span class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
          </span>
          <span class="text" v-if="!isCollapsed">立案审核</span>
        </router-link>
        <router-link to="/dossier-reading" class="menu-item" active-class="active">
          <span class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </span>
          <span class="text" v-if="!isCollapsed">智能阅卷</span>
        </router-link>
        <router-link to="/doc-writer" class="menu-item" active-class="active">
          <span class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
          </span>
          <span class="text" v-if="!isCollapsed">文书写作助手</span>
        </router-link>
        <router-link to="/doc-review" class="menu-item" active-class="active">
          <span class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="14" r="3"/><line x1="16" y1="20" x2="12.1" y2="16.1"/></svg>
          </span>
          <span class="text" v-if="!isCollapsed">文书审核</span>
        </router-link>
      </nav>

      <div class="sidebar-footer" @click="toggleCollapse">
        <span class="collapse-icon">
          <svg v-if="isCollapsed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
        </span>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-right">
          <span class="user-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span>
          <span class="user-name">仲裁员</span>
        </div>
      </header>
      
      <main class="content-area">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.workbench-container {
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  padding-top: 14px;
  box-sizing: border-box;
  background-color: var(--color-bg-body);
}
.workbench-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 14px;
  background: #fff;
  border-bottom: 1px solid var(--color-divider);
  z-index: 1;
}

/* Sidebar */
.sidebar {
  position: relative;
  width: var(--sidebar-width);
  background: var(--color-bg-sidebar);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1);
  flex-shrink: 0;
  z-index: 10;
}
.sidebar::before {
  content: '';
  position: absolute;
  top: -14px;
  right: -1px;
  width: 1px;
  height: 14px;
  background: var(--color-border);
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 18px;
  border-bottom: 1px solid var(--color-divider);
  color: var(--color-primary);
  overflow: hidden;
  white-space: nowrap;
  background: #fff;
  box-sizing: border-box;
}
.logo-icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #ffffff;
  background: linear-gradient(145deg, #1d4ed8 0%, #1e3a8a 100%);
  border: 1px solid #1e40af;
  box-shadow: 0 4px 10px rgba(30, 58, 138, 0.2);
  flex-shrink: 0;
}
.logo-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}
.logo-text {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-primary);
  letter-spacing: 0.01em;
}
.logo-sub {
  font-size: 11px;
  line-height: 1.35;
  color: var(--color-text-sub);
  letter-spacing: 0.04em;
}
.sidebar.collapsed .sidebar-header {
  justify-content: center;
  padding: 0;
}
.collapsed .logo-icon {
  margin: 0 auto;
}

.sidebar-menu {
  flex: 1;
  padding: 18px 10px 14px;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 14px;
  margin-bottom: 6px;
  border-radius: 8px;
  color: var(--color-text-body);
  text-decoration: none;
  transition: all 0.22s ease;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid transparent;
}

.menu-item:hover {
  background-color: #f6f9ff;
  color: var(--color-primary);
  border-color: #d2def5;
}

.menu-item.active {
  background: #edf3ff;
  color: var(--color-primary);
  font-weight: 600;
  border-color: #c8daf9;
  box-shadow: none;
}

.menu-item .icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.menu-item .icon svg {
  display: block;
}
.menu-item .text {
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0.01em;
}
.collapsed .menu-item {
  justify-content: center;
  padding: 0;
}
.collapsed .menu-item .icon {
  margin-right: 0;
}

.sidebar-footer {
  height: 48px;
  border-top: 1px solid var(--color-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-sub);
}
.sidebar-footer:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-body);
}

/* Main Content */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Prevent flex overflow */
}

.top-header {
  height: var(--header-height);
  background: #fff;
  border-bottom: 1px solid var(--color-divider);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  box-shadow: none;
  z-index: 5;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text-body);
  font-size: 14px;
}
.user-avatar {
  font-size: 20px;
  background: var(--color-bg-body);
  border-radius: 50%;
  padding: 4px;
}

.content-area {
  flex: 1;
  overflow: hidden; /* Important for inner scrolling */
  padding: 16px;
  position: relative;
  background-color: var(--color-bg-body);
}
</style>
