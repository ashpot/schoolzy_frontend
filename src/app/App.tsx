import AppRouter from '@/app/Routing'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const App = () => {
  return(
    <QueryClientProvider client={queryClient}>
      <AppRouter/>
    </QueryClientProvider>
  ) 
}
export default App