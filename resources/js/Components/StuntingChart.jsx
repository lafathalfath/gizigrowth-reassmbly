import { usePage } from "@inertiajs/inertia-react";
import { Chart } from "chart.js";
import { useEffect, useState } from "react";


const StuntingChart=({data})=>{
    // const {data} = usePage().props;
    const [chart, setChart] = useState(null);
    useEffect(()=>{
        if (data && data.length > 0) {
            const years = data.map(item=>item.tahun);
            const kasusStunting = data.map(item=>item.jumlah_kasus_stunting);
            const daerah = data.map(item=>item.nama_daerah);

            const ctx = document.getElementById('stuntingChart').getContext('2d');
            const newChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Jumlah Kasu Stunting',
                        data: kasusStunting,
                        backgroundColor: '#ffffff',
                        borderColor: '#000000',
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            type: 'linear',
                            beginAtZero: true,
                        },
                    },
                },
            });
            setChart(newChart);
        }
    }, [data]);
    return <>
        <canvas id="stuntingChart" className="w-400 h-200"></canvas>
    </>
}

export default StuntingChart;