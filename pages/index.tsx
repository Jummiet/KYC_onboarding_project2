import Link from 'next/link'
import { Button } from '../src/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../src/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            KYC Onboarding Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your customer onboarding with our compliant, configurable KYC solution.
            Built for banks, fintechs, and financial institutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-700">Customer Portal</CardTitle>
              <CardDescription>
                Start your KYC onboarding journey with email/phone verification and step-by-step data collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/customer/register">
                <Button className="w-full">Start Onboarding</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-green-700">Bank Admin Portal</CardTitle>
              <CardDescription>
                Configure KYC requirements, manage submissions, and set up webhook integrations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/login">
                <Button variant="outline" className="w-full">Admin Login</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-700">Developer SDKs</CardTitle>
              <CardDescription>
                Integrate KYC flows into your applications with our React, Angular, and vanilla JS SDKs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/sdk-demo">
                <Button variant="secondary" className="w-full">View SDKs</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 text-sm text-gray-500">
            <span>✓ Multi-tenant Support</span>
            <span>✓ Webhook Integration</span>
            <span>✓ Document Upload</span>
            <span>✓ Compliance Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}