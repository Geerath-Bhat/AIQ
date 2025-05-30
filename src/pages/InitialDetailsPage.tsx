import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Though FormLabel from FormField will be primarily used
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const formSchema = z.object({
  candidateName: z.string().min(2, { message: 'Candidate name must be at least 2 characters.' }),
  metalReqId: z.string().min(1, { message: 'Metal REQ ID is required.' }),
  jobTitle: z.string().min(3, { message: 'Job title must be at least 3 characters.' }),
  screenerName: z.string().min(1, { message: 'Please select your name.' }),
});

type InitialDetailsFormValues = z.infer<typeof formSchema>;

const screenerNames = [
  'Saurabh Singh',
  'Alok Kumar',
  'Priya Sharma',
  'Amit Patel',
];

const redFlags = [
  'Overly rehearsed or generic answers.',
  'Inability to discuss past failures or learnings constructively.',
  'Heavy reliance on buzzwords without demonstrating deep understanding.',
  'Evasion of direct technical questions or deflecting to unrelated topics.',
  'Lack of specific examples when describing experiences.',
  'Poor communication skills or difficulty articulating thoughts clearly.',
  'Negative attitude towards previous employers or colleagues.',
];

const InitialDetailsPage = () => {
  console.log('InitialDetailsPage loaded');
  const navigate = useNavigate();

  const form = useForm<InitialDetailsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateName: '',
      metalReqId: '',
      jobTitle: '',
      screenerName: '',
    },
  });

  const onSubmit = (data: InitialDetailsFormValues) => {
    console.log('Initial Details Submitted:', data);
    // Here you would typically save this data to a state management solution or pass it via route state
    navigate('/assessment', { state: { initialDetails: data } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-sky-400">AI QUOTIENT (AIQ) ASSESSMENT</h1>
        <p className="text-lg text-slate-300 mt-2">
          Please fill in all required details to begin the candidate evaluation.
        </p>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <Card className="lg:col-span-3 bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-sky-300">Candidate & Screener Information</CardTitle>
            <CardDescription className="text-slate-400">
              Enter the candidate's details and select your name as the screener.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="candidateName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Candidate Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Jane Doe"
                          {...field}
                          className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="metalReqId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Metal REQ ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., MTR-12345"
                          {...field}
                          className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Job Title (Candidate is applying for)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., AI Engineer, Data Scientist"
                          {...field}
                          className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="screenerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Screener Name (Your Name)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500">
                            <SelectValue placeholder="Select your name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-700 border-slate-600 text-white">
                          {screenerNames.map((name) => (
                            <SelectItem key={name} value={name} className="hover:bg-slate-600 focus:bg-slate-600">
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white text-lg py-3 mt-4"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Starting...' : 'Start Assessment'}
                  {!form.formState.isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-400 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-amber-400" />
              Red Flags to Watch For
            </CardTitle>
            <CardDescription className="text-slate-400">
              Keep these points in mind during the assessment process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="bg-amber-900/30 border-amber-700 text-amber-300">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <AlertTitle className="font-semibold text-amber-400">Important Considerations</AlertTitle>
              <AlertDescription>
                <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                  {redFlags.map((flag, index) => (
                    <li key={index}>{flag}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
      <footer className="mt-12 text-center text-slate-500 text-sm">
        AIQ Assessment Platform v1.0
      </footer>
    </div>
  );
};

export default InitialDetailsPage;