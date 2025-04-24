
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Users, 
  Calendar, 
  Star, 
  PieChart,
  ArrowRight 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import LiveMatchesPreview from '@/components/LiveMatchesPreview';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pl-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Ultimate Premier League Fantasy Hub
              </h1>
              <p className="text-lg mb-6">
                Make smarter decisions with advanced stats, live tracking, and expert recommendations
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-pl-green text-pl-purple hover:bg-white">
                  <Link to="/live-tracker">Live Matches</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white hover:bg-white/10">
                  <Link to="/squad-builder">Build Your Squad</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/lovable-uploads/66088b53-3019-4abb-80c3-ebe9eaa6b4d4.png" 
                alt="FantaSawy" 
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="pl-section-title">Live Matches</h2>
            <Link to="/live-tracker" className="flex items-center text-pl-purple hover:text-pl-green">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <LiveMatchesPreview />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center pl-section-title mb-12">Fantasy Tools to Boost Your Rank</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tool 1 */}
            <div className="pl-card p-6 flex flex-col items-center text-center">
              <div className="bg-pl-purple/10 p-4 rounded-full mb-4">
                <BarChart2 size={32} className="text-pl-purple" />
              </div>
              <h3 className="text-xl font-bold text-pl-purple mb-2">Live Match Tracker</h3>
              <p className="text-gray-600 mb-4">
                Real-time scores, goals, assists, and player events with detailed statistics.
              </p>
              <Button asChild variant="outline" className="mt-auto border-pl-purple text-pl-purple hover:bg-pl-purple/10">
                <Link to="/live-tracker">Track Now</Link>
              </Button>
            </div>
            
            {/* Tool 2 */}
            <div className="pl-card p-6 flex flex-col items-center text-center">
              <div className="bg-pl-purple/10 p-4 rounded-full mb-4">
                <Users size={32} className="text-pl-purple" />
              </div>
              <h3 className="text-xl font-bold text-pl-purple mb-2">Player Comparison</h3>
              <p className="text-gray-600 mb-4">
                Compare players side-by-side with advanced stats and interactive graphs.
              </p>
              <Button asChild variant="outline" className="mt-auto border-pl-purple text-pl-purple hover:bg-pl-purple/10">
                <Link to="/player-stats">Compare Players</Link>
              </Button>
            </div>
            
            {/* Tool 3 */}
            <div className="pl-card p-6 flex flex-col items-center text-center">
              <div className="bg-pl-purple/10 p-4 rounded-full mb-4">
                <Calendar size={32} className="text-pl-purple" />
              </div>
              <h3 className="text-xl font-bold text-pl-purple mb-2">Fixture Planner</h3>
              <p className="text-gray-600 mb-4">
                Plan ahead with color-coded fixture difficulty ratings for the upcoming gameweeks.
              </p>
              <Button asChild variant="outline" className="mt-auto border-pl-purple text-pl-purple hover:bg-pl-purple/10">
                <Link to="/fixture-planner">Plan Ahead</Link>
              </Button>
            </div>
            
            {/* Tool 4 */}
            <div className="pl-card p-6 flex flex-col items-center text-center">
              <div className="bg-pl-purple/10 p-4 rounded-full mb-4">
                <Star size={32} className="text-pl-purple" />
              </div>
              <h3 className="text-xl font-bold text-pl-purple mb-2">Top Picks</h3>
              <p className="text-gray-600 mb-4">
                Data-driven recommendations for the best players and captains each gameweek.
              </p>
              <Button asChild variant="outline" className="mt-auto border-pl-purple text-pl-purple hover:bg-pl-purple/10">
                <Link to="/top-picks">Get Recommendations</Link>
              </Button>
            </div>
            
            {/* Tool 5 */}
            <div className="pl-card p-6 flex flex-col items-center text-center">
              <div className="bg-pl-purple/10 p-4 rounded-full mb-4">
                <PieChart size={32} className="text-pl-purple" />
              </div>
              <h3 className="text-xl font-bold text-pl-purple mb-2">Squad Builder</h3>
              <p className="text-gray-600 mb-4">
                Create your ideal FPL team with our interactive builder and points predictor.
              </p>
              <Button asChild variant="outline" className="mt-auto border-pl-purple text-pl-purple hover:bg-pl-purple/10">
                <Link to="/squad-builder">Build Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-pl-purple text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/66088b53-3019-4abb-80c3-ebe9eaa6b4d4.png" 
                  alt="FantaSawy Logo" 
                  className="h-10 w-auto mr-2"
                />
                <span className="font-bold text-xl">FantaSawy</span>
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Your ultimate Premier League Fantasy Football companion
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/live-tracker" className="hover:text-pl-green">Live Tracker</Link></li>
                  <li><Link to="/player-stats" className="hover:text-pl-green">Player Stats</Link></li>
                  <li><Link to="/fixture-planner" className="hover:text-pl-green">Fixture Planner</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Tools</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/top-picks" className="hover:text-pl-green">Top Picks</Link></li>
                  <li><Link to="/squad-builder" className="hover:text-pl-green">Squad Builder</Link></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold mb-2">Connect</h3>
                <p className="text-sm text-gray-300 mb-2">Join our community</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-pl-green">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-pl-green">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/10 text-sm text-gray-300">
            <p>© 2025 FantaSawy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
