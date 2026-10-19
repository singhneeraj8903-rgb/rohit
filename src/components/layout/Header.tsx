
'use client';

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, Menu, X } from 'lucide-react';

import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/Button';
import { RecentFilesDropdown } from '@/components/common/RecentFilesDropdown';
import { searchTools, type SearchResult } from '@/lib/utils/search';
import { getToolContent } from '@/config/tool-content';
import { getAllTools } from '@/config/tools';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export interface HeaderProps {
  locale: Locale;
  showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  locale,
  showSearch = true,
}) => {
  const t = useTranslations('common');
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [localizedTools, setLocalizedTools] = useState<
    Record<string, { title: string; description: string }>
  >({});

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Load localized tool content
  useEffect(() => {
    const allTools = getAllTools();

    const contentMap: Record<
      string,
      { title: string; description: string }
    > = {};

    allTools.forEach((tool) => {
      const content = getToolContent(locale, tool.id);

      if (content) {
        contentMap[tool.id] = {
          title: content.title,
          description: content.metaDescription,
        };
      }
    });

    setLocalizedTools(contentMap);
  }, [locale]);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Search tools
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    const results = searchTools(searchQuery, localizedTools);

    setSearchResults(results.slice(0, 8));
    setSelectedIndex(-1);
  }, [searchQuery, localizedTools]);

  // Close search when clicking outside
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Navigate to a PDF tool
  const navigateToTool = useCallback(
    (slug: string) => {
      router.push(`/${locale}/tools/${slug}`);

      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      setSelectedIndex(-1);
      setIsMobileMenuOpen(false);
    },
    [locale, router]
  );

  // Search keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();

        setSelectedIndex((prev) =>
          Math.min(prev + 1, searchResults.length - 1)
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();

        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter') {
        e.preventDefault();

        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          navigateToTool(searchResults[selectedIndex].tool.slug);
        } else if (searchResults.length > 0) {
          navigateToTool(searchResults[0].tool.slug);
        }
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setSelectedIndex(-1);
      }
    },
    [searchResults, selectedIndex, navigateToTool]
  );

  // Open or close search
  const handleSearchToggle = useCallback(() => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      setSelectedIndex(-1);
    } else {
      setIsSearchOpen(true);

      window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === 'k'
      ) {
        if (!showSearch) return;

        e.preventDefault();
        setIsSearchOpen(true);

        window.setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [showSearch]);

  // Mobile navigation
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // PDF tool category icons
  const getToolIcon = (category: string) => {
    const icons: Record<string, string> = {
      'edit-annotate': '✏️',
      'convert-to-pdf': '📄',
      'convert-from-pdf': '🖼️',
      'organize-manage': '📁',
      'optimize-repair': '🔧',
      'secure-pdf': '🔒',
    };

    return icons[category] || '📄';
  };

  // Main navigation
  const navItems = [
    {
      href: `/${locale}`,
      label: t('navigation.home') || 'Home',
    },
    {
      href: `/${locale}/tools`,
      label: t('navigation.tools') || 'PDF Tools',
    },
    {
      href: `/${locale}/workflow`,
      label: `${t('navigation.workflow') || 'Workflow'} BETA`,
    },
    {
      href: `/${locale}/about`,
      label: t('navigation.about') || 'About Us',
    },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-[hsl(var(--color-border))/0.5] bg-[hsl(var(--color-background))]/80 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* PDFRang Brand */}
          <div className="flex flex-1 items-center gap-2">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-2.5 text-xl font-bold text-[hsl(var(--color-foreground))] transition-opacity hover:opacity-90"
              aria-label={`PDFRang - ${t('navigation.home') || 'Home'}`}
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] shadow-lg shadow-primary/25 transition-transform group-hover:scale-105">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>

              <span
                className="text-xl tracking-tight"
                data-testid="brand-name"
              >
                PDFRang
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`hidden items-center gap-1 rounded-full border border-[hsl(var(--color-border))/0.4] bg-[hsl(var(--color-background))/0.5] p-1.5 shadow-sm backdrop-blur-sm transition-all duration-300 md:flex ${
              isSearchOpen
                ? 'pointer-events-none translate-y-[-10px] opacity-0'
                : 'translate-y-0 opacity-100'
            }`}
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-all hover:bg-[hsl(var(--color-muted))/0.5] hover:text-[hsl(var(--color-foreground))]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex flex-1 items-center justify-end gap-3">
            {/* Search */}
            {showSearch && (
              <div className="relative" ref={searchContainerRef}>
                {isSearchOpen ? (
                  <div className="fixed left-4 right-4 top-[22px] z-50 animate-in fade-in slide-in-from-right-4 duration-200 md:absolute md:left-auto md:right-0 md:top-1/2 md:w-96 md:-translate-y-1/2 md:origin-right">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))]" />

                      <input
                        ref={searchInputRef}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                          t('search.placeholder') || 'Search PDF tools...'
                        }
                        className="w-full rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] py-2.5 pl-10 pr-10 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]"
                        aria-label="Search PDF tools"
                        autoComplete="off"
                        role="combobox"
                        aria-expanded={searchResults.length > 0}
                        aria-controls="pdf-tool-search-results"
                        aria-activedescendant={
                          selectedIndex >= 0
                            ? `pdf-tool-result-${selectedIndex}`
                            : undefined
                        }
                      />

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSearchToggle}
                        aria-label="Close search"
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-transparent"
                      >
                        <X
                          className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]"
                          aria-hidden="true"
                        />
                      </Button>

                      {searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                          <ul
                            id="pdf-tool-search-results"
                            className="py-2"
                            role="listbox"
                            aria-label="PDF tool search results"
                          >
                            {searchResults.map((result, index) => {
                              const localized =
                                localizedTools[result.tool.id];

                              const toolName =
                                localized?.title ||
                                result.tool.id
                                  .replace(/-/g, ' ')
                                  .replace(/\b\w/g, (c) =>
                                    c.toUpperCase()
                                  );

                              const toolDescription =
                                localized?.description ||
                                result.tool.features
                                  .slice(0, 3)
                                  .join(' • ');

                              return (
                                <li key={result.tool.id}>
                                  <button
                                    id={`pdf-tool-result-${index}`}
                                    type="button"
                                    onClick={() =>
                                      navigateToTool(result.tool.slug)
                                    }
                                    onMouseEnter={() =>
                                      setSelectedIndex(index)
                                    }
                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                      index === selectedIndex
                                        ? 'bg-[hsl(var(--color-primary))/0.1] text-[hsl(var(--color-primary))]'
                                        : 'text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))]'
                                    }`}
                                    role="option"
                                    aria-selected={index === selectedIndex}
                                  >
                                    <span className="text-xl">
                                      {getToolIcon(result.tool.category)}
                                    </span>

                                    <div className="min-w-0 flex-1">
                                      <div className="truncate text-sm font-semibold">
                                        {toolName}
                                      </div>

                                      <div className="truncate text-xs text-[hsl(var(--color-muted-foreground))]">
                                        {toolDescription}
                                      </div>
                                    </div>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSearchToggle}
                    aria-label="Open search"
                    className="relative text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]"
                  >
                    <Search className="h-5 w-5" aria-hidden="true" />

                    <span className="ml-2 hidden rounded border border-[hsl(var(--color-border))] px-1.5 py-0.5 text-xs text-[hsl(var(--color-muted-foreground))/0.5] lg:inline-block">
                      Ctrl K
                    </span>
                  </Button>
                )}
              </div>
            )}

            {/* Recent Files */}
            <RecentFilesDropdown
              locale={locale}
              translations={{
                title: t('recentFiles.title') || 'Recent Files',
                empty: t('recentFiles.empty') || 'No recent files',
                clearAll: t('recentFiles.clearAll') || 'Clear all',
                processedWith:
                  t('recentFiles.processedWith') || 'Processed with',
              }}
            />

            {/* Theme */}
            <ThemeToggle />

            {/* Language Selector Mount Point */}
            <div id="language-selector-slot" />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={handleMobileMenuToggle}
              aria-label={
                isMobileMenuOpen ? 'Close menu' : 'Open menu'
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] py-4 shadow-lg backdrop-blur-xl md:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-2 p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-[hsl(var(--color-foreground))] transition-colors hover:bg-[hsl(var(--color-muted))]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
