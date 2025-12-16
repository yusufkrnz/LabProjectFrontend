import { Filter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Category {
    id: string;
    label: string;
    icon: LucideIcon;
}

interface FilterSectionProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: any) => void;
}

export default function FilterSection({ categories, selectedCategory, onCategoryChange }: FilterSectionProps) {
    return (
        <div className="filter-section">
            <h3 className="filter-title">
                <Filter size={18} />
                Kategoriler
            </h3>
            <div className="filter-categories">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`filter-category ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => onCategoryChange(category.id)}
                    >
                        <category.icon size={18} />
                        {category.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
