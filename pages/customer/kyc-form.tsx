import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card'
import { Button } from '../../src/components/ui/button'
import { Input } from '../../src/components/ui/input'

interface KYCData {
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  city: string
  postalCode: string
  country: string
  idNumber: string
  idType: string
}

export default function KYCForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [kycData, setKycData] = useState<KYCData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    idNumber: '',
    idType: 'passport'
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('kyc_token')
    if (!token) {
      router.push('/customer/register')
    }
  }, [router])

  const handleInputChange = (field: keyof KYCData, value: string) => {
    setKycData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('kyc_token')
      const response = await fetch('/api/customer/submit-kyc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(kycData),
      })

      if (response.ok) {
        router.push('/customer/upload-documents')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'KYC submission failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <Input
                  value={kycData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <Input
                  value={kycData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <Input
                type="date"
                value={kycData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <Input
                value={kycData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
                placeholder="Enter your street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <Input
                  value={kycData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <Input
                  value={kycData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  required
                  placeholder="Enter postal code"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <Input
                value={kycData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
                placeholder="Enter your country"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Identity Verification</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
              <select
                value={kycData.idType}
                onChange={(e) => handleInputChange('idType', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="national_id">National ID</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
              <Input
                value={kycData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                required
                placeholder="Enter your ID number"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Complete Your KYC Information</CardTitle>
          <CardDescription>
            Step {currentStep} of 3 - {currentStep === 1 ? 'Personal Information' : currentStep === 2 ? 'Address Information' : 'Identity Verification'}
          </CardDescription>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {error && (
              <div className="text-red-600 text-sm mt-4">{error}</div>
            )}

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit KYC'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}