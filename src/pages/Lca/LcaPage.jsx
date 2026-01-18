import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LcaHeader from '../../components/layout/LcaLayout/LcaHeader';
import LcaFooter from '../../components/layout/LcaLayout/LcaFooter';
import LcaTabs, { Tab } from '../../components/layout/LcaLayout/LcaTabs';
import EcoPointsSimulator from '../../components/lcaComponents/EcoPointsSimulator';
import ResearchFindings from '../../components/lcaComponents/ResearchFindings';
import LCATracker from '../../components/lcaComponents/LCATracker';

const LcaPage = () => {
    const [activeTab, setActiveTab] = useState(Tab.SIMULATOR); // Default manual tab

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-gradient-to-br from-eco-100 via-sky-50 to-eco-50 selection:bg-eco-200">

            {/* Header */}
            <LcaHeader />

            {/* Navigation (Manual Tabs for Simulator & Research) */}
            <LcaTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 transition-all duration-500 ease-in-out">
                {/* Manual Tabs */}
                {activeTab === Tab.SIMULATOR && <EcoPointsSimulator />}
                {activeTab === Tab.RESEARCH && <ResearchFindings />}

                {/* LCA Tracker Routes (Dedicated URLs) */}
                <Routes>
                    <Route path=":productId" element={<LCATracker />} />
                </Routes>
            </main>

            {/* Footer */}
            <LcaFooter />
        </div>
    );
};

export default LcaPage;
