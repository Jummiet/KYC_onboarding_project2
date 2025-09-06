import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card'
import { Button } from '../../src/components/ui/button'
import { Input } from '../../src/components/ui/input'

export default function VerifyOTP() {
  const [emailOtp, setEmailOtp] = useState('')
  const [phoneOtp, setPhoneOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const emailParam = router.query.email as string
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [router.query])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/customer/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, emailOtp, phoneOtp }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('kyc_token', data.token)
        router.push('/customer/kyc-form')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'OTP verification failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      const response = await fetch('/api/customer/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        alert('OTP sent successfully!')
      } else {
        alert('Failed to resend OTP')
      }
    } catch (err) {
      alert('An error occurred while resending OTP')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
          <CardDescription>
            Enter the OTP codes sent to your email and phone
          </CardDescription>
          {email && (
            <p className="text-sm text-gray-600 mt-2">
              Email: {email}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="emailOtp" className="block text-sm font-medium text-gray-700 mb-1">
                Email OTP
              </label>
              <Input
                id="emailOtp"
                type="text"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                required
                placeholder="Enter 6-digit email OTP"
                maxLength={6}
              />
            </div>
            
            <div>
              <label htmlFor="phoneOtp" className="block text-sm font-medium text-gray-700 mb-1">
                Phone OTP
              </label>
              <Input
                id="phoneOtp"
                type="text"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                required
                placeholder="Enter 6-digit phone OTP"
                maxLength={6}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Didn't receive OTP? Resend
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}