import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AIQLevelIndicator, { AIQLevel } from '@/components/AIQLevelIndicator'; // Custom component
import RichTextEditorWrapper from '@/components/RichTextEditorWrapper'; // Custom component
import { Label } from '@/components/ui/label'; // shadcn/ui
import { Button } from '@/components/ui/button'; // shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui
import { toast } from 'sonner'; // For notifications

const ResultsAndNotesPage: React.FC = () => {
  console.log('ResultsAndNotesPage loaded');
  const navigate = useNavigate();

  // In a real application, this AIQ level would likely be passed via props or context
  // based on calculations from the AssessmentPage.
  const [candidateAIQLevel] = useState<AIQLevel>('High'); // Example: 'High', 'Medium', 'Low', or null
  const [screenerNotes, setScreenerNotes] = useState<string>('');

  const handleNotesChange = (value: string) => {
    setScreenerNotes(value);
  };

  const handleSaveAssessment = () => {
    // Simulate saving the assessment
    console.log('Saving assessment with AIQ Level:', candidateAIQLevel, 'and Notes:', screenerNotes);
    // Display a success toast
    toast.success('Assessment and notes saved successfully!', {
      description: `Candidate AIQ: ${candidateAIQLevel}. Notes have been recorded.`,
    });
    // Optionally, navigate to another page after saving, e.g., back to initial details
    // navigate('/initial-details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400">
          Assessment Results & Screener Notes
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Review the candidate's AIQ level and add your qualitative observations.
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <Card className="bg-slate-800/70 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-sky-300 text-center">Candidate AIQ Level</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <AIQLevelIndicator
              level={candidateAIQLevel}
              summary={
                candidateAIQLevel === 'High' ? "Strong alignment with AI-role requirements." :
                candidateAIQLevel === 'Medium' ? "Moderate alignment, potential for growth." :
                candidateAIQLevel === 'Low' ? "Limited current alignment with AI-role needs." :
                "AIQ calculation pending or incomplete."
              }
              showIcon={true}
              showText={true}
            />
          </CardContent>
        </Card>

        <Card className="bg-slate-800/70 border-slate-700 shadow-xl">
          <CardHeader>
            <Label htmlFor="screenerNotesEditor" className="text-xl font-semibold text-sky-300">
              Qualitative Notes & Comments
            </Label>
          </CardHeader>
          <CardContent>
            <RichTextEditorWrapper
              initialValue={screenerNotes}
              onChange={handleNotesChange}
              placeholder="Enter your detailed qualitative notes and comments about the candidate's assessment here..."
              className="min-h-[250px] prose-invert" // prose-invert for better dark mode text visibility
            />
          </CardContent>
        </Card>

        <section className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700 shadow-lg">
          <Button
            onClick={handleSaveAssessment}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold w-full sm:w-auto"
          >
            Save Assessment & Notes
          </Button>
          <Link to="/assessment" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="border-sky-500 text-sky-400 hover:bg-sky-500/20 hover:text-sky-300 w-full">
              Review Assessment Questions
            </Button>
          </Link>
          <Link to="/initial-details" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-slate-200 w-full">
              Start New Assessment
            </Button>
          </Link>
        </section>
      </main>
      <footer className="mt-12 text-center text-slate-500 text-xs">
        AIQ Assessment Platform © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default ResultsAndNotesPage;