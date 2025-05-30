import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import InteractiveRelevanceTags from '@/components/InteractiveRelevanceTags'; // Custom component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';

type RelevanceValue = 'Relevant' | 'NonRelevant' | null;

interface Question {
  id: string;
  category: string;
  text: string;
}

const assessmentQuestions: Question[] = [
  { id: 'q1', category: "Understanding of AI Concepts", text: "Can the candidate clearly explain the difference between supervised and unsupervised learning, providing examples for each?" },
  { id: 'q2', category: "Practical Application & Experience", text: "Has the candidate described a specific project where they applied machine learning techniques to solve a real-world problem, detailing their role and the outcome?" },
  { id: 'q3', category: "Technical Proficiency & Tools", text: "Does the candidate demonstrate familiarity with common AI/ML libraries and frameworks (e.g., TensorFlow, PyTorch, scikit-learn) and their appropriate use cases?" },
  { id: 'q4', category: "Problem Solving & Critical Thinking", text: "When presented with a hypothetical AI-related challenge, does the candidate exhibit a structured approach to problem decomposition and solution design?" },
  { id: 'q5', category: "Ethical Considerations & Responsible AI", text: "Does the candidate show awareness of potential biases in AI models and discuss ethical implications or best practices for responsible AI development?" },
  { id: 'q6', category: "Learning Agility & Continuous Improvement", text: "Is there evidence of the candidate's proactive approach to learning new AI tools, techniques, or research advancements in the field?" },
  { id: 'q7', category: "Collaboration & Communication", text: "Can the candidate effectively communicate complex AI concepts and project details to both technical and non-technical audiences?" },
];

interface AnswersState {
  [questionId: string]: RelevanceValue;
}

const AssessmentPage = () => {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const answeredQuestions = Object.values(answers).filter(answer => answer !== null).length;
    setProgress((answeredQuestions / assessmentQuestions.length) * 100);
    console.log('AssessmentPage loaded or answers updated');
  }, [answers]);

  const handleRelevanceChange = (questionId: string, value: RelevanceValue) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmitAssessment = () => {
    // Here you would typically save the assessment data (answers)
    console.log("Assessment submitted with answers:", answers);
    // For now, we just navigate to the results page
    navigate('/results-and-notes'); // Path from App.tsx
  };

  const allQuestionsAnswered = Object.keys(answers).length === assessmentQuestions.length && Object.values(answers).every(answer => answer !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 md:p-8 flex flex-col items-center">
      <Card className="w-full max-w-3xl bg-slate-800/70 border-slate-700 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-sky-400">
            AIQ Assessment - Screening AI-Friendly Talent
          </CardTitle>
          <CardDescription className="text-slate-400 mt-2">
            Evaluate the candidate's responses based on their relevance to the AI role.
            Your insights are crucial for determining their AI Quotient.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="sticky top-0 bg-slate-800/90 backdrop-blur-sm py-4 z-10 -mx-6 px-6 rounded-t-md">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-sky-300">Overall Progress</span>
                <span className="text-sm font-bold text-sky-300">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full h-3 [&>div]:bg-sky-500" />
            <p className="text-xs text-slate-500 mt-1 text-center">
              {Object.values(answers).filter(a => a !== null).length} of {assessmentQuestions.length} questions evaluated.
            </p>
          </div>
          
          <ScrollArea className="h-[calc(100vh-380px)] md:h-[calc(100vh-350px)] pr-4 -mr-4"> {/* Adjusted height */}
            <div className="space-y-6">
              {assessmentQuestions.map((question, index) => (
                <div key={question.id} className="p-5 bg-slate-900/50 rounded-lg border border-slate-700 shadow-md">
                  <p className="text-sm font-semibold text-sky-400 mb-1">
                    Question {index + 1} <span className="text-slate-500 font-normal">| {question.category}</span>
                  </p>
                  <p className="text-slate-200 mb-3 text-base leading-relaxed">{question.text}</p>
                  <InteractiveRelevanceTags
                    questionId={question.id}
                    initialValue={answers[question.id] || null}
                    onChange={handleRelevanceChange}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex flex-col items-center pt-6 border-t border-slate-700">
           <p className="text-xs text-slate-500 mb-4 text-center">
            Ensure all questions are evaluated before proceeding.
          </p>
          <Button
            onClick={handleSubmitAssessment}
            disabled={!allQuestionsAnswered}
            size="lg"
            className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white disabled:bg-slate-600 disabled:text-slate-400 transition-all duration-150 ease-in-out group"
          >
            Proceed to Results & Notes
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-150 group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssessmentPage;