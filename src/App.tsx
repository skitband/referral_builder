import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { ReferralForm } from './components/ReferralForm';
import { ReferralList } from './components/ReferralList';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-8">Referral Builder</h1>
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <ReferralForm />
          </div>
          <div className="bg-white rounded-lg shadow">
            <ReferralList />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;