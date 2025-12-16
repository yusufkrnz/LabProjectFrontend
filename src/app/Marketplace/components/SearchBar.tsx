import { Search } from 'lucide-react';

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <Search size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Proje ara..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
}
