import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface VerificationSuccessProps {
  message: string;
  onGoToLogin: () => void;
  onGoToDashboard: () => void;
}

export const VerificationSuccess = ({
  message,
  onGoToLogin,
  onGoToDashboard,
}: VerificationSuccessProps) => {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Success"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl text-green-600">
            Email Verified!
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={onGoToLogin} className="w-full" size="lg">
            Go to Login
          </Button>
          <Button
            onClick={onGoToDashboard}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
