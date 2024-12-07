"use client";

import { useState } from "react";
import { PhoneFrame } from "./phone-simulator/PhoneFrame";
import { ConfigForm } from "./settings/ConfigForm";
import { USSDConfig, PhoneTheme } from "@/lib/types";
import { DEFAULT_CONFIG } from "@/lib/constants";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Settings, History } from "lucide-react";
import {  useAppStore } from "@/hooks/use-app-state";

export function USSDSimulator() {
  const [theme, setTheme] = useState<PhoneTheme>("ios");
  const [config, setConfig] = useState<USSDConfig>(DEFAULT_CONFIG);
  const { logs } = useAppStore();

  const { isLoading,  } = useUSSDSession();

 

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex  justify-between flex-col gap-4 mb-4 items-center border-b pb-4">
          <h5 className="text-xl font-bold">USSD Simulator</h5>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "ios" ? "default" : "outline"}
                onClick={() => setTheme("ios")}
              >
                iOS
              </Button>
              <Button
                variant={theme === "android" ? "default" : "outline"}
                onClick={() => setTheme("android")}
              >
                Android
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <PhoneFrame
              theme={theme}
              isLoading={isLoading}
              operator={config.operator}
            />
          </div>

          <div>
            <Tabs defaultValue="settings">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="logs" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Logs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="mt-4">
                <ConfigForm onSubmit={setConfig} />
              </TabsContent>

              <TabsContent value="logs" className="mt-4">
                <div className="space-y-4">
                  {logs.map((log, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Request {index + 1}</h3>
                        <span className="text-sm text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <pre className="text-sm bg-muted p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.request, null, 2)}
                      </pre>
                      <h3 className="font-medium my-2">Response</h3>
                      <pre className="text-sm bg-muted p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.response, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
