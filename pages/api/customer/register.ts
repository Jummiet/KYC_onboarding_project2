import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../src/lib/prisma'
import { generateOTP, getOTPExpiryTime } from '../../../src/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, phone } = req.body

  if (!email || !phone) {
    return res.status(400).json({ message: 'Email and phone are required' })
  }

  try {
    // For MVP, we'll use a default bank. In production, this would be determined by API key or subdomain
    const defaultBank = await prisma.bank.findFirst({
      where: { slug: 'default' }
    })

    if (!defaultBank) {
      // Create a default bank for demo purposes
      const newBank = await prisma.bank.create({
        data: {
          name: 'Demo Bank',
          slug: 'default',
          email: 'admin@demobank.com',
          website: 'https://demobank.com',
          apiKey: 'demo-api-key'
        }
      })
    }

    const bank = defaultBank || await prisma.bank.findFirst({ where: { slug: 'default' } })

    // Generate OTPs
    const emailOtp = generateOTP()
    const phoneOtp = generateOTP()
    const otpExpiresAt = getOTPExpiryTime()

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        email_bankId: {
          email,
          bankId: bank!.id
        }
      }
    })

    let customer
    if (existingCustomer) {
      // Update existing customer with new OTP
      customer = await prisma.customer.update({
        where: { id: existingCustomer.id },
        data: {
          phone,
          emailOtp,
          phoneOtp,
          otpExpiresAt,
          isVerified: false
        }
      })
    } else {
      // Create new customer
      customer = await prisma.customer.create({
        data: {
          email,
          phone,
          emailOtp,
          phoneOtp,
          otpExpiresAt,
          bankId: bank!.id
        }
      })
    }

    // TODO: Send OTP via email and SMS
    // For MVP, we'll just log the OTPs
    console.log(`Email OTP for ${email}: ${emailOtp}`)
    console.log(`Phone OTP for ${phone}: ${phoneOtp}`)

    res.status(200).json({ 
      message: 'OTP sent successfully',
      customerId: customer.id
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}