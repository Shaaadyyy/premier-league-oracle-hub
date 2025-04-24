
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
                <Button asChild size="lg" className="bg-pl-green text-pl-purple hover:bg-green-400">
                  <Link to="/live-tracker">Live Matches</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-pl-purple hover:bg-gray-200">
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
                <span className="font-bold text-xl">Fantasawy</span>
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
                  <a href="https://www.facebook.com/fantasawy" className="text-white hover:text-pl-green">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/fantasawy" className="text-white hover:text-pl-green">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="https://x.com/fantasawy" className="text-white hover:text-pl-green">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@fantasawy" className="text-white hover:text-pl-green">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-youtube" viewBox="0 0 30 30">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/10 text-sm text-gray-300">
            <p>© 2025 Fantasawy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
