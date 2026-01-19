import { useMemo } from 'react';
import Plot from 'react-plotly.js';

export default function VectorCluster() {
    // Generate random 3D data only once
    const { cluster1, cluster2, cluster3, targetPoint } = useMemo(() => {
        const generateCluster = (points: number, center: [number, number, number], spread: number) => {
            const x: number[] = [];
            const y: number[] = [];
            const z: number[] = [];

            for (let i = 0; i < points; i++) {
                x.push(center[0] + (Math.random() - 0.5) * spread);
                y.push(center[1] + (Math.random() - 0.5) * spread);
                z.push(center[2] + (Math.random() - 0.5) * spread);
            }
            return { x, y, z };
        };

        return {
            cluster1: generateCluster(50, [1, 1, 1], 1.5),
            cluster2: generateCluster(40, [-1, -1, 0], 2),
            cluster3: generateCluster(30, [1, -2, 2], 2),
            targetPoint: { x: [1.2], y: [1.1], z: [0.9] }
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', touchAction: 'none' }}>
            <Plot
                data={[
                    {
                        x: cluster1.x,
                        y: cluster1.y,
                        z: cluster1.z,
                        mode: 'markers',
                        type: 'scatter3d',
                        name: 'Perfect Match',
                        marker: { size: 4, color: '#60a5fa', opacity: 0.8 }
                    },
                    {
                        x: cluster2.x,
                        y: cluster2.y,
                        z: cluster2.z,
                        mode: 'markers',
                        type: 'scatter3d',
                        name: 'Skill Overlap',
                        marker: { size: 3, color: '#a78bfa', opacity: 0.6 }
                    },
                    {
                        x: cluster3.x,
                        y: cluster3.y,
                        z: cluster3.z,
                        mode: 'markers',
                        type: 'scatter3d',
                        name: 'Candidates',
                        marker: { size: 2, color: '#94a3b8', opacity: 0.4 }
                    },
                    {
                        x: targetPoint.x,
                        y: targetPoint.y,
                        z: targetPoint.z,
                        mode: 'markers',
                        type: 'scatter3d',
                        name: 'Your Requirements',
                        marker: { size: 10, color: '#facc15', symbol: 'diamond', opacity: 1 }
                    }
                ]}
                layout={{
                    width: 600,
                    height: 500,
                    margin: { l: 0, r: 0, b: 0, t: 0 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    showlegend: true,
                    legend: { x: 0, y: 1, font: { color: '#ffffff' }, bgcolor: 'rgba(0,0,0,0)' },
                    scene: {
                        xaxis: { title: 'Skills', showgrid: true, gridcolor: '#1e293b', zerolinecolor: '#334155', tickfont: { color: '#64748b' } },
                        yaxis: { title: 'Experience', showgrid: true, gridcolor: '#1e293b', zerolinecolor: '#334155', tickfont: { color: '#64748b' } },
                        zaxis: { title: 'Culture', showgrid: true, gridcolor: '#1e293b', zerolinecolor: '#334155', tickfont: { color: '#64748b' } },
                        bgcolor: 'rgba(0,0,0,0)',
                        camera: { eye: { x: 1.5, y: 1.5, z: 1.2 } }
                    },
                    autosize: true
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: '100%', height: '100%' }}
                // @ts-ignore
                useResizeHandler={true}
            />
        </div>
    );
}
