"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Database, Server, Cloud, Package } from "lucide-react";

interface HealthStatus {
  status: string;
  timestamp: string;
  services: {
    mongodb: { status: string; details: any };
    redis: { status: string; details: any };
    aws: { status: string; details: any };
  };
  environment: {
    nodeEnv: string;
    domain: string;
    websiteName: string;
  };
  database: {
    collections: number;
    sampleData: any;
  };
}

export default function SystemHealth() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [seedingProducts, setSeedingProducts] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/health", {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || ""
        }
      });
      const data = await response.json();
      setHealthStatus(data);
    } catch (error) {
      console.error("Health check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const seedProducts = async () => {
    setSeedingProducts(true);
    try {
      const response = await fetch("/api/admin/seed-products", {
        method: "POST",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || ""
        }
      });
      const data = await response.json();
      if (data.success) {
        alert("Sample products created successfully!");
        checkHealth(); // Refresh health status
      } else {
        alert("Failed to create products: " + data.error);
      }
    } catch (error) {
      console.error("Product seeding failed:", error);
      alert("Failed to create products");
    } finally {
      setSeedingProducts(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === "connected" || status === "healthy"
      ? "default"
      : status === "configured" || status === "degraded"
        ? "secondary"
        : "destructive";

    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">System Health & Setup</h1>
        <Button onClick={checkHealth} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Check System Health
        </Button>
      </div>

      {healthStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MongoDB Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MongoDB</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getStatusBadge(healthStatus.services.mongodb.status)}
              </div>
              {healthStatus.services.mongodb.details && (
                <p className="text-xs text-muted-foreground mt-2">
                  Collections: {healthStatus.database.collections}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Redis Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Redis Cache</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getStatusBadge(healthStatus.services.redis.status)}
              </div>
            </CardContent>
          </Card>

          {/* AWS Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AWS Services</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getStatusBadge(healthStatus.services.aws.status)}
              </div>
              {healthStatus.services.aws.details && (
                <p className="text-xs text-muted-foreground mt-2">
                  S3: {healthStatus.services.aws.details.bucket}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Database Data */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Database Content</CardTitle>
              <CardDescription>Current data in your database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {healthStatus.database.sampleData.products || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {healthStatus.database.sampleData.customers || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Customers</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {healthStatus.database.sampleData.orders || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button

                  className="w-full"
                >
                  {seedingProducts && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Package className="mr-2 h-4 w-4" />
                  Create Sample Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!healthStatus && !loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              Click "Check System Health" to test your database connections and system status.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}