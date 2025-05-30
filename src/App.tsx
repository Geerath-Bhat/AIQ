import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AssessmentPage from "./pages/AssessmentPage";
import InitialDetailsPage from "./pages/InitialDetailsPage";
import ResultsAndNotesPage from "./pages/ResultsAndNotesPage";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/initial-details" element={<InitialDetailsPage />} />
          <Route path="/results-and-notes" element={<ResultsAndNotesPage />} />
          {/* catch-all */}
          {/* <Route path="*" element={<NotFound />} /> */}


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
