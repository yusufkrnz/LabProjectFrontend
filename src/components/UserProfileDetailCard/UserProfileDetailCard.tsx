import './UserProfileDetailCard.css';
import React from 'react';
import { Card, CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import {
    Unstable_RadarDataProvider as RadarDataProvider,
    RadarGrid,
    RadarSeriesMarks,
    RadarSeriesArea,
    RadarMetricLabels,
    RadarAxisHighlight,
} from '@mui/x-charts/RadarChart';
import { ChartsSurface } from '@mui/x-charts/ChartsSurface';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import ContactMenu from '../ContactMenu/ContactMenu';


/* VERİ YAPILARI VE VARSAYILANLAR */
const DEFAULT_METRICS = ['Frontend', 'Backend', 'Cloud', 'Database', 'Security', 'Testing'];

// Composition API için 'id' ve 'fillArea' parametreleri önemlidir
const DEFAULT_SERIES = [
    {
        id: 'skills-current',
        label: 'Yetkinlik Seviyesi',
        data: [90, 85, 70, 80, 60, 75],
        fillArea: true,
    },
    {
        id: 'skills-target',
        label: 'Kullanıcı Seviyesi',
        data: [100, 95, 90, 90, 85, 90],
        fillArea: true,
    },
];

export default function UserProfileDetailCard() {
    // Veriler bu objede toplanır
    const radarConfig = {
        metrics: DEFAULT_METRICS,
    };

    return (
        <div className='user-profile-detail-card-main'>
            <div className='user-profile-header'>
                <div className='user-cover-image'>
                    <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Cover" />
                </div>
                <div className='user-avatar-container'>
                    <img
                        className='user-avatar-img'
                        src="https://ui-avatars.com/api/?name=User+Name&background=0D8ABC&color=fff"
                        alt="Avatar"
                    />
                    <ContactMenu />
                </div>
            </div>

            <div className='user-profile-content'>
                <h1>Ahmet Yılmaz</h1>
                <p>Full Stack Developer</p>
                {/* değişecek burası */}
                <div className='user-profile-social-info'>
                    <span><b>21</b> followers</span>
                    ·
                    <span><b>27</b> following</span>
                </div>

                <div className='user-profile-actions'>
                    <button className='edit-profile-btn'>Edit Profile</button>
                </div>
            </div>
            <div className='profile-info-detail-card'>
                <p>Merhabalar bilgilerimm vs </p>
                {/*kişi bilgilerini burada gösterceğiz  */}
            </div>
            <div className='profile-archivement-card'>

                <h3>Archivement</h3>
                <img src="../../public/media/KaggleArc.png" alt=""
                    width={50}
                    height={50} />
                {/*kişi başarılarını burada gösterceğiz */}
            </div>
            <div className='user-profile-detail-card-location'>
                {/* Location  information */}
                <p>İstanbul, Turkey</p>
            </div>

            <Card className='profile-chart-card' sx={{ m: 0, mt: 1, backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}>
                <CardContent sx={{
                    width: "100%",
                    height: 270,
                    display: "flex",
                    justifyContent: "center",
                    padding: "0 !important",
                    alignItems: "center"
                }}
                >
                    {/* Composition API Implementation */}
                    {/* @ts-ignore - Unstable API warning suppression */}
                    <RadarDataProvider
                        series={DEFAULT_SERIES}
                        radar={radarConfig}
                        margin={{ left: 45, right: 45, top: 20, bottom: 20 }}
                    >
                        <Stack direction="column" alignItems="center" gap={1} sx={{ width: '100%' }}>
                            <ChartsLegend />
                            <ChartsSurface>
                                <RadarGrid divisions={5} />
                                <RadarMetricLabels />
                                <RadarSeriesArea
                                    fill="transparent"
                                    strokeWidth={2}
                                    seriesId="skills-current"
                                />
                                <RadarSeriesArea
                                    fill="transparent"
                                    strokeWidth={1}
                                    seriesId="skills-target"
                                    strokeDasharray="4, 4"
                                    strokeLinecap="round"
                                />
                                <RadarAxisHighlight />
                                <RadarSeriesMarks />
                            </ChartsSurface>
                        </Stack>
                    </RadarDataProvider>
                </CardContent>
            </Card>
        </div>
    );
}