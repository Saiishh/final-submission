import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="surveillance-card max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">UchitTech AI</CardTitle>
          <CardDescription className="text-lg">
            Advanced AI-Powered Video Surveillance System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-muted-foreground">
              Professional security monitoring with real-time object detection
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-sm">Person Detection</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🦺</div>
                <div className="text-sm">Safety Gear</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🚨</div>
                <div className="text-sm">Real-time Alerts</div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/surveillance')} 
            className="w-full"
            size="lg"
          >
            Access Surveillance System
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Demo Credentials: admin@uchittechnology.com / admin123
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
