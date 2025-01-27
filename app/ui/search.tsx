'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Update query parameter when debounced value changes
  const updateSearch = () => {
    const params = new URLSearchParams(searchParams.toString()); // Clone current params
    params.set('page', '1');
    if (debouncedSearchTerm) {
      params.set('query', debouncedSearchTerm);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Watch for changes in debounced value
  useEffect(() => {
    updateSearch();
  }, [debouncedSearchTerm]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
