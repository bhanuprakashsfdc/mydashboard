import { useState } from "react";
import { motion } from "framer-motion";
import AccountFilters from "../components/AccountFilters/AccountFilters";
import AccountGrid from "../components/AccountGrid/AccountGrid";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAccountFilters } from "../hooks/useAccountFilters";
import { useAccountSelection } from "../hooks/useAccountSelection";
import { useSectionFilter } from "../hooks/useSectionFilter";
import { accounts } from "../data/data";
import { prompts } from "../data/prompts";
import "./AccountsPage.css";

export default function AccountsPage() {
  const [selectedSection, setSelectedSection] = useState(null);
  const { filteredAccounts: sectionFilteredAccounts, counts } = useSectionFilter(selectedSection);

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

  const {
    selectedIds,
    toggleOne,
    toggleAllFiltered,
    clearSelection,
    isSelected,
    isAllFilteredSelected,
    isSomeFilteredSelected,
  } = useAccountSelection(sortedAccounts.length);

  const selectedCount = selectedIds.size;

  return (
    <div className="accounts-page">
      <Sidebar
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
        accountCounts={counts}
        promptsCount={prompts.length}
      />
      <div className="accounts-page-main">
        <motion.div 
          className="accounts-page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="accounts-page-title">Accounts</h1>
          <p className="accounts-page-subtitle">
            Browse and manage your resources
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
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
            accounts={sortedAccounts}
            selectedIds={selectedIds}
            toggleOne={toggleOne}
            toggleAllFiltered={toggleAllFiltered}
            clearSelection={clearSelection}
            isSelected={isSelected}
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
