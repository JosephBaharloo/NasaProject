import React from 'react';
import { Link } from 'react-router-dom';
import { CloudHail, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="text-white h-screen w-screen p-4 flex flex-col items-center justify-center text-center">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
             <div className="relative z-10 flex flex-col items-center">
                <CloudHail className="w-24 h-24 mb-4" />
                <h1 className="text-6xl font-bold mb-4">Aura Weather</h1>
                <p className="text-xl max-w-2xl mb-8 text-gray-300">
                    Your personal AI weather assistant. Get hyper-local forecasts, smart activity suggestions, and stay ahead of the weather.
                </p>
                <div className="flex gap-4">
                    <Link to="/dashboard" className="glass-panel-light px-8 py-4 rounded-full flex items-center gap-2 font-bold text-lg hover:bg-white/20 transition-colors">
                        Get Started <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/dashboard" className="bg-transparent border border-white/50 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
