
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { FootprintData, CalculationResult, Recommendation, Region } from './types';
import { INITIAL_DATA, REGIONAL_FACTORS } from './constants';
import { InputGroup } from './components/InputGroup';

const App: React.FC = () => {
  const [data, setData] = useState<FootprintData>(INITIAL_DATA);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState<'calculator' | 'results'>('calculator');

  const results = useMemo((): CalculationResult => {
    const factors = REGIONAL_FACTORS[data.region];
    
    const energyCO2 = (data.energy.electricity * 12 * (data.energy.renewable ? 0.05 : factors.electricity)) + 
                      (data.energy.gas * 12 * factors.gas);
    const transportCO2 = (data.transport.carKm * 52 * factors.car) + 
                         (data.transport.flightHours * factors.flight) +
                         (data.transport.publicTransitHours * 52 * (data.region === 'India' ? 1.5 : 2.5));
    const dietCO2 = factors.diet[data.diet];
    const wasteBase = 800;
    const wasteReduction = (data.waste.recycles ? 400 : 0) + (data.waste.composts ? 200 : 0);
    const wasteCO2 = Math.max(0, wasteBase - wasteReduction);
    const total = energyCO2 + transportCO2 + dietCO2 + wasteCO2;

    return {
      total,
      breakdown: { energy: energyCO2, transport: transportCO2, diet: dietCO2, waste: wasteCO2 },
      comparison: { 
        average: factors.avgPerCapita, 
        status: total < (factors.avgPerCapita * 0.7) ? 'low' : total < (factors.avgPerCapita * 1.3) ? 'average' : 'high' 
      }
    };
  }, [data]);

  const getStaticRecommendations = (data: FootprintData, results: CalculationResult): Recommendation[] => {
    const recs: Recommendation[] = [];
    const { energy, transport, diet, waste } = results.breakdown;
    const isIndia = data.region === 'India';

    // Energy Recommendations
    if (!data.energy.renewable) {
      recs.push({
        title: isIndia ? "Switch to PM-KUSUM Solar" : "Install Residential Solar",
        impact: "High",
        description: isIndia 
          ? "The PM-KUSUM scheme provides subsidies for solar pumps and grid-connected solar plants. It can reduce your home energy footprint to near zero."
          : "Installing solar panels can reduce your grid dependence. Many regions offer tax credits or feed-in tariffs.",
        category: "Energy"
      });
    }

    // Transport Recommendations
    if (transport > 2000) {
      recs.push({
        title: isIndia ? "Adopt Local Electric Mobility" : "Transition to Electric Vehicle",
        impact: "High",
        description: isIndia
          ? "Switch to Indian EV brands like Tata or Mahindra. They offer models optimized for local road conditions and urban commutes."
          : "Switching from an internal combustion engine to an EV can reduce transport emissions by over 60% depending on your power source.",
        category: "Transport"
      });
    }

    // Diet Recommendations
    if (data.diet === 'meat-heavy' || data.diet === 'balanced') {
      recs.push({
        title: "Plant-Based Transition",
        impact: "Medium",
        description: "Reducing red meat consumption even by 2 days a week significantly lowers methane output and water usage associated with your lifestyle.",
        category: "Diet"
      });
    }

    // Waste Recommendations
    if (!data.waste.composts) {
      recs.push({
        title: "Initiate Home Composting",
        impact: "Low",
        description: "Diverting organic waste from landfills prevents methane generation. Composted soil is also a carbon sink for your home garden.",
        category: "Waste"
      });
    }

    // Regional Fallback/Additional
    if (isIndia && recs.length < 4) {
      recs.push({
        title: "Support Traditional Practices",
        impact: "Medium",
        description: "Adopt 'Zero Waste' traditional Indian habits like using copper vessels, cloth bags (Thaili), and supporting local seasonal produce markets.",
        category: "Lifestyle"
      });
    }

    return recs.slice(0, 4);
  };

  const handleCalculate = () => {
    const recs = getStaticRecommendations(data, results);
    setRecommendations(recs);
    setActiveTab('results');
  };

  const chartData = [
    { name: 'Energy', value: Math.round(results.breakdown.energy), color: '#10b981' },
    { name: 'Transport', value: Math.round(results.breakdown.transport), color: '#3b82f6' },
    { name: 'Diet', value: Math.round(results.breakdown.diet), color: '#f59e0b' },
    { name: 'Waste', value: Math.round(results.breakdown.waste), color: '#8b5cf6' },
  ];

  const comparisonData = [
    { name: 'You', value: Math.round(results.total) },
    { name: `${data.region} Avg`, value: results.comparison.average },
    { name: 'Target', value: 1500 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200">
              <i className="fas fa-leaf text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight italic">EcoTrace</h1>
          </div>
          <nav className="hidden md:flex space-x-1 bg-slate-100 p-1 rounded-xl">
            {['calculator', 'results'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeTab === tab ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-2 space-y-6">
              {/* Region Selector */}
              <section className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-emerald-900">Regional Context</h2>
                  <p className="text-sm text-emerald-700 font-medium">Localized calculation factors enabled.</p>
                </div>
                <div className="flex bg-white p-1 rounded-xl shadow-sm">
                  {(['Global', 'India'] as Region[]).map(r => (
                    <button
                      key={r}
                      onClick={() => setData(d => ({...d, region: r}))}
                      className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${
                        data.region === r ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </section>

              <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3"><i className="fas fa-bolt text-sm"></i></span>
                  Home Energy Consumption
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Electricity" icon="fas fa-plug" suffix="kWh/mo" value={data.energy.electricity} onChange={(v) => setData(d => ({...d, energy: {...d.energy, electricity: v}}))} />
                  <InputGroup label="Natural Gas" icon="fas fa-fire" suffix="kWh/mo" value={data.energy.gas} onChange={(v) => setData(d => ({...d, energy: {...d.energy, gas: v}}))} />
                  <div className="md:col-span-2">
                    <InputGroup label="Renewable Energy (Solar/Wind)?" icon="fas fa-sun" type="checkbox" value={data.energy.renewable} onChange={(v) => setData(d => ({...d, energy: {...d.energy, renewable: v}}))} />
                  </div>
                </div>
              </section>

              <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center">
                   <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3"><i className="fas fa-car text-sm"></i></span>
                  Mobility & Travel
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Car Distance" icon="fas fa-road" suffix="km/week" value={data.transport.carKm} onChange={(v) => setData(d => ({...d, transport: {...d.transport, carKm: v}}))} />
                  <InputGroup label="Air Travel" icon="fas fa-plane" suffix="hrs/year" value={data.transport.flightHours} onChange={(v) => setData(d => ({...d, transport: {...d.transport, flightHours: v}}))} />
                  <div className="md:col-span-2">
                    <InputGroup label="Public Transit Usage" icon="fas fa-bus" suffix="hrs/week" value={data.transport.publicTransitHours} onChange={(v) => setData(d => ({...d, transport: {...d.transport, publicTransitHours: v}}))} />
                  </div>
                </div>
              </section>

              <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center">
                   <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3"><i className="fas fa-utensils text-sm"></i></span>
                  Diet & Waste
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Dietary Pattern" icon="fas fa-drumstick-bite" type="select" options={[{ value: 'meat-heavy', label: 'Meat Intensive' }, { value: 'balanced', label: 'Balanced' }, { value: 'vegetarian', label: 'Vegetarian' }, { value: 'vegan', label: 'Vegan' }]} value={data.diet} onChange={(v) => setData(d => ({...d, diet: v}))} />
                  <div className="flex flex-col justify-end space-y-4">
                    <InputGroup label="Recycle Active?" icon="fas fa-recycle" type="checkbox" value={data.waste.recycles} onChange={(v) => setData(d => ({...d, waste: {...d.waste, recycles: v}}))} />
                    <InputGroup label="Compost Active?" icon="fas fa-seedling" type="checkbox" value={data.waste.composts} onChange={(v) => setData(d => ({...d, waste: {...d.waste, composts: v}}))} />
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-8 rounded-[2rem] shadow-2xl sticky top-24 overflow-hidden group">
                <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs mb-2">Annual CO2e (Tonnes)</p>
                <div className="flex items-baseline space-x-2 mb-8">
                  <h3 className="text-6xl font-black">{(results.total / 1000).toFixed(1)}</h3>
                  <span className="text-2xl font-medium text-emerald-100">Tons</span>
                </div>
                <div className="space-y-5 mb-10">
                  {chartData.map(item => (
                    <div key={item.name}>
                      <div className="flex justify-between text-xs font-bold mb-1.5 uppercase tracking-tighter">
                        <span>{item.name}</span>
                        <span>{Math.round((item.value / results.total) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${(item.value / results.total) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleCalculate} className="w-full bg-white text-emerald-700 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-xl">
                  <i className="fas fa-chart-line"></i>
                  <span>Analysis & Results</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-10 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <h3 className="text-xl font-black mb-8 text-slate-800 flex items-center"><i className="fas fa-chart-pie mr-2 text-emerald-500"></i> Emissions Breakdown</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                        {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <h3 className="text-xl font-black mb-8 text-slate-800 flex items-center"><i className="fas fa-balance-scale mr-2 text-blue-500"></i> Localized Comparison ({data.region})</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                      <RechartsTooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={40}>
                        {comparisonData.map((entry, index) => <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#e2e8f0'} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-800 flex items-center"><i className="fas fa-lightbulb mr-3 text-emerald-500"></i> Recommended Sustainability Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${rec.impact === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-sky-50 text-sky-600'}`}>
                        {rec.impact} Impact
                      </span>
                      <span className="text-[10px] text-slate-400 font-black bg-slate-50 px-3 py-1 rounded-lg uppercase">{rec.category}</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{rec.title}</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
