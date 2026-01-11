import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

export default function WIP() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Work In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Spinner className="w-8 h-8 text-blue-500" />
            <Alert className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
              <AlertDescription>
                Trang này đang được phát triển. Vui lòng quay lại sau!
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}