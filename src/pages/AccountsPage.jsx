import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AccountFilters from "../components/AccountFilters/AccountFilters";
import AccountGrid from "../components/AccountGrid/AccountGrid";
import Sidebar from "../components/Sidebar/Sidebar";
import AppHeader from "../components/AppHeader/AppHeader";
import KPIStatsRow from "../components/KPIStats/KPIStatsRow";
import { useAccountFilters } from "../hooks/useAccountFilters";
import { useAccountSelection } from "../hooks/useAccountSelection";
import { usePinnedAccounts } from "../hooks/usePinnedAccounts";
import { useSectionFilter } from "../hooks/useSectionFilter";
import { accounts } from "../data/data";
import { prompts } from "../data/prompts";
import { youTubeTracks } from "../data/music";
import "./AccountsPage.css";

export default function AccountsPage() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { filteredAccounts: sectionFilteredAccounts, counts } = useSectionFilter(selectedSection);
  const { pinnedIds, togglePin, isPinned, unpinAll, pinnedFirst } = usePinnedAccounts();

  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    updateFilter,
    clearAllFilters,
    hasActiveFilters,
    sortedAccounts,
    sortState,
    setSortState,
  } = useAccountFilters(sectionFilteredAccounts);

  // Pinned accounts always float to the top of the grid, regardless of
  // sort / filter / search.
  const displayedAccounts = useMemo(
    () => pinnedFirst(sortedAccounts),
    [sortedAccounts, pinnedFirst]
  );

  const {
    selectedIds,
    toggleOne,
    toggleAllFiltered,
    clearSelection,
    isSelected,
    isAllFilteredSelected,
    isSomeFilteredSelected,
  } = useAccountSelection(displayedAccounts.length);

  const selectedCount = selectedIds.size;
  const pinnedCount = pinnedIds.size;

  const kpiStats = useMemo(() => {
    const active = accounts.filter((a) => a.status === "active").length;
    const featured = accounts.filter((a) => a.featured).length;
    const highPriority = accounts.filter((a) => a.priority === "high").length;
    return [
      {
        label: "Total Accounts",
        value: accounts.length,
        icon: "Database",
        trend: "up",
        trendValue: "+12%",
      },
      {
        label: "Active",
        value: active,
        icon: "CheckCircle",
      },
      {
        label: "Featured",
        value: featured,
        icon: "Star",
        variant: "dark",
      },
      {
        label: "High Priority",
        value: highPriority,
        icon: "AlertCircle",
        trend: "up",
        trendValue: "+5%",
      },
    ];
  }, []);

  return (
    <div className={`accounts-page ${sidebarCollapsed ? "accounts-page-collapsed" : ""}`}>
      <Sidebar
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
        accountCounts={counts}
        promptsCount={prompts.length}
        musicTracks={youTubeTracks}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="accounts-page-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <AppHeader
            title="Accounts"
            subtitle="Browse and manage your resources"
            user={{ name: "Bhanu" }}
            onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            collapsed={sidebarCollapsed}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <KPIStatsRow stats={kpiStats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <AccountFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilters={activeFilters}
            updateFilter={updateFilter}
            clearAllFilters={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
            accounts={sectionFilteredAccounts}
            resultCount={sortedAccounts.length}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <AccountGrid
            accounts={displayedAccounts}
            pinnedIds={pinnedIds}
            pinnedCount={pinnedCount}
            onUnpinAll={unpinAll}
            selectedIds={selectedIds}
            toggleOne={toggleOne}
            toggleAllFiltered={toggleAllFiltered}
            clearSelection={clearSelection}
            isSelected={isSelected}
            isPinned={isPinned}
            onPinToggle={togglePin}
            isAllFilteredSelected={isAllFilteredSelected}
            isSomeFilteredSelected={isSomeFilteredSelected}
            sortState={sortState}
            setSortState={setSortState}
          />
        </motion.div>
      </div>
    </div>
  );
}