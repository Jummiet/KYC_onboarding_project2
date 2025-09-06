import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../src/components/ui/card'
import { Button } from '../src/components/ui/button'

export default function SDKDemo() {
  const [selectedSDK, setSelectedSDK] = useState('react')

  const sdkExamples = {
    react: {
      title: 'React SDK',
      description: 'Easy integration with React hooks and components',
      installation: 'npm install @kyc-platform/react-sdk',
      code: `import { useKYC } from '@kyc-platform/react-sdk'

function App() {
  const { KYCWidget, isComplete } = useKYC({
    apiKey: 'your-api-key',
    bankId: 'your-bank-id',
    onComplete: (data) => {
      console.log('KYC completed:', data)
    },
    onError: (error) => {
      console.error('KYC error:', error)
    }
  })

  return (
    <div>
      <h1>Welcome to Our Banking App</h1>
      <KYCWidget />
      {isComplete && <p>KYC verification completed!</p>}
    </div>
  )
}`
    },
    angular: {
      title: 'Angular SDK',
      description: 'Angular service and component integration',
      installation: 'npm install @kyc-platform/angular-sdk',
      code: `import { Component } from '@angular/core'
import { KYCService } from '@kyc-platform/angular-sdk'

@Component({
  selector: 'app-kyc',
  template: \`
    <h1>KYC Verification</h1>
    <kyc-widget 
      [config]="kycConfig"
      (onComplete)="handleComplete($event)"
      (onError)="handleError($event)">
    </kyc-widget>
  \`
})
export class KYCComponent {
  kycConfig = {
    apiKey: 'your-api-key',
    bankId: 'your-bank-id'
  }

  handleComplete(data: any) {
    console.log('KYC completed:', data)
  }

  handleError(error: any) {
    console.error('KYC error:', error)
  }
}`
    },
    vanilla: {
      title: 'Vanilla JavaScript',
      description: 'Simple script tag integration',
      installation: '<script src="https://cdn.kyc-platform.com/widget.js"></script>',
      code: `<div id="kyc-widget"></div>

<script src="https://cdn.kyc-platform.com/widget.js"></script>
<script>
  KYCWidget.init({
    container: '#kyc-widget',
    apiKey: 'your-api-key',
    bankId: 'your-bank-id',
    onComplete: function(data) {
      console.log('KYC completed:', data)
      // Redirect to success page or show confirmation
    },
    onError: function(error) {
      console.error('KYC error:', error)
      // Show error message to user
    },
    theme: {
      primaryColor: '#3B82F6',
      borderRadius: '8px'
    }
  })
</script>`
    },
    reactNative: {
      title: 'React Native',
      description: 'Native mobile app integration',
      installation: 'npm install @kyc-platform/react-native-sdk',
      code: `import React from 'react'
import { View, Text } from 'react-native'
import { KYCWidget } from '@kyc-platform/react-native-sdk'

export default function App() {
  const handleComplete = (data) => {
    console.log('KYC completed:', data)
    // Navigate to next screen or show success message
  }

  const handleError = (error) => {
    console.error('KYC error:', error)
    // Show error alert
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', margin: 20 }}>
        Complete Your KYC
      </Text>
      <KYCWidget
        apiKey="your-api-key"
        bankId="your-bank-id"
        onComplete={handleComplete}
        onError={handleError}
        style={{ flex: 1 }}
      />
    </View>
  )
}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Developer SDKs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate KYC onboarding into your applications with ease. 
            Choose from our React, Angular, Vanilla JS, or React Native SDKs.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* SDK Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(sdkExamples).map(([key, sdk]) => (
              <Button
                key={key}
                variant={selectedSDK === key ? "default" : "outline"}
                onClick={() => setSelectedSDK(key)}
                className="min-w-[120px]"
              >
                {sdk.title}
              </Button>
            ))}
          </div>

          {/* SDK Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700">
                {sdkExamples[selectedSDK as keyof typeof sdkExamples].title}
              </CardTitle>
              <CardDescription className="text-lg">
                {sdkExamples[selectedSDK as keyof typeof sdkExamples].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Installation</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    {sdkExamples[selectedSDK as keyof typeof sdkExamples].installation}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Usage Example</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{sdkExamples[selectedSDK as keyof typeof sdkExamples].code}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">🔧 Easy Integration</CardTitle>
                <CardDescription>
                  Drop-in components and hooks that work out of the box
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700">🎨 Customizable</CardTitle>
                <CardDescription>
                  Theme and style the widget to match your brand
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-700">📱 Mobile Ready</CardTitle>
                <CardDescription>
                  Responsive design that works perfectly on all devices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-700">🔒 Secure</CardTitle>
                <CardDescription>
                  Enterprise-grade security with HTTPS and data encryption
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-700">⚡ Fast</CardTitle>
                <CardDescription>
                  Optimized performance with lazy loading and caching
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-indigo-700">📊 Analytics</CardTitle>
                <CardDescription>
                  Built-in analytics and conversion tracking
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-8">
              Contact our team to get your API keys and start integrating today.
            </p>
            <div className="space-x-4">
              <Button size="lg">Get API Keys</Button>
              <Button variant="outline" size="lg">View Documentation</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}