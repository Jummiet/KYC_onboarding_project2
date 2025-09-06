import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../src/lib/prisma'
import { generateToken, isOTPExpired } from '../../../src/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, emailOtp, phoneOtp } = req.body

  if (!email || !emailOtp || !phoneOtp) {
    return res.status(400).json({ message: 'Email and both OTPs are required' })
  }

  try {
    // Find customer by email
    const customer = await prisma.customer.findFirst({
      where: { 
        email,
        isVerified: false
      },
      include: {
        bank: true
      }
    })

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found or already verified' })
    }

    // Check if OTP has expired
    if (!customer.otpExpiresAt || isOTPExpired(customer.otpExpiresAt)) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' })
    }

    // Verify OTPs
    if (customer.emailOtp !== emailOtp || customer.phoneOtp !== phoneOtp) {
      return res.status(400).json({ message: 'Invalid OTP codes' })
    }

    // Update customer as verified
    const verifiedCustomer = await prisma.customer.update({
      where: { id: customer.id },
      data: {
        isVerified: true,
        emailOtp: null,
        phoneOtp: null,
        otpExpiresAt: null
      }
    })

    // Generate JWT token
    const token = generateToken({
      customerId: customer.id,
      email: customer.email,
      bankId: customer.bankId
    })

    res.status(200).json({ 
      message: 'OTP verified successfully',
      token,
      customer: {
        id: verifiedCustomer.id,
        email: verifiedCustomer.email,
        phone: verifiedCustomer.phone
      }
    })
  } catch (error) {
    console.error('OTP verification error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}