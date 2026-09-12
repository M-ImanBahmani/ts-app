import { ToastContainer } from "react-toastify";
import Routing from "./Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry:2
    }
  }
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
          hideProgressBar={false}
        />
        <Routing />
      </QueryClientProvider>
    </>
  );
}

export default App;
