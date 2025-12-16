import { useState } from 'react';
import { Briefcase, Search, Filter, Grid, List } from 'lucide-react';
import './Marketplace.css';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import ProjectCard from './components/ProjectCard';

type ViewType = 'grid' | 'list';
type CategoryType = 'all' | 'ai' | 'web' | 'mobile' | 'data';

// Mock data - bu kısım sonra API'den gelecek
const mockProjects = [
    {
        id: 1,
        title: 'AI Destekli Chatbot Geliştirme',
        description: 'Müşteri hizmetleri için yapay zeka destekli chatbot geliştirme projesi. NLP ve makine öğrenmesi teknolojileri kullanılacak.',
        budget: '5000-10000',
        category: 'ai',
        skills: ['Python', 'TensorFlow', 'NLP'],
        postedDate: '2 saat önce',
        clientName: 'TechCorp A.Ş.',
        proposals: 12,
    },
    {
        id: 2,
        title: 'E-Ticaret Web Sitesi Tasarımı',
        description: 'Modern ve responsive bir e-ticaret platformu tasarımı. React ve Node.js kullanılacak.',
        budget: '3000-5000',
        category: 'web',
        skills: ['React', 'Node.js', 'CSS'],
        postedDate: '5 saat önce',
        clientName: 'AlışVeriş Ltd.',
        proposals: 8,
    },
    {
        id: 3,
        title: 'Mobil Uygulama Geliştirme',
        description: 'iOS ve Android için sağlık takip uygulaması. React Native ile cross-platform geliştirme.',
        budget: '8000-15000',
        category: 'mobile',
        skills: ['React Native', 'Firebase', 'Redux'],
        postedDate: '1 gün önce',
        clientName: 'Sağlık Plus',
        proposals: 15,
    },
    {
        id: 4,
        title: 'Veri Analizi ve Görselleştirme',
        description: 'Büyük veri seti analizi ve interaktif dashboard oluşturma. Power BI ve Python kullanılacak.',
        budget: '4000-7000',
        category: 'data',
        skills: ['Python', 'Power BI', 'SQL'],
        postedDate: '3 gün önce',
        clientName: 'DataDriven Co.',
        proposals: 6,
    },
];

export default function Marketplace() {
    const [viewType, setViewType] = useState<ViewType>('grid');
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all' as CategoryType, label: 'Tümü', icon: Briefcase },
        { id: 'ai' as CategoryType, label: 'Yapay Zeka', icon: Briefcase },
        { id: 'web' as CategoryType, label: 'Web Geliştirme', icon: Briefcase },
        { id: 'mobile' as CategoryType, label: 'Mobil', icon: Briefcase },
        { id: 'data' as CategoryType, label: 'Veri Bilimi', icon: Briefcase },
    ];

    const filteredProjects = mockProjects.filter((project) => {
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="marketplace-container">
            <div className="marketplace-content">
                <div className="marketplace-header">
                    <h1>Marketplace</h1>
                    <p>Projeleriniz için en uygun iş ortaklarını bulun</p>
                </div>

                <SearchBar 
                    searchQuery={searchQuery} 
                    onSearchChange={setSearchQuery} 
                />

                <div className="marketplace-main">
                    <aside className="marketplace-sidebar">
                        <FilterSection 
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                    </aside>

                    <div className="marketplace-projects">
                        <div className="projects-header">
                            <span className="projects-count">{filteredProjects.length} proje bulundu</span>
                            <div className="view-toggle">
                                <button 
                                    className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewType('grid')}
                                >
                                    <Grid size={18} />
                                </button>
                                <button 
                                    className={`view-btn ${viewType === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewType('list')}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>

                        <div className={`projects-grid ${viewType}`}>
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} viewType={viewType} />
                            ))}
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="no-results">
                                <Search size={48} />
                                <h3>Sonuç bulunamadı</h3>
                                <p>Farklı anahtar kelimeler veya filtreler deneyin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
