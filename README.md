# KYC Onboarding MVP

A comprehensive Know Your Customer (KYC) onboarding platform built for digital banking with Next.js, Prisma, PostgreSQL, and modern UI components.

## 🚀 Features

### Customer Experience
- **Email & Phone OTP Verification** - Secure multi-factor authentication
- **Step-by-step KYC Forms** - Progressive data collection with validation
- **Document Upload** - Support for multiple document types
- **Progress Persistence** - Resume onboarding from where you left off
- **Responsive Design** - Works seamlessly on desktop and mobile

### Bank Administration
- **Multi-tenant Architecture** - Support for multiple banks
- **Configurable KYC Fields** - Define custom data requirements per bank
- **Document Requirements** - Configure required document types
- **Validation Rules** - Set custom validation logic (age, ID format, etc.)
- **Webhook Integration** - Automated data delivery to bank systems
- **Submission Management** - Review and manage customer submissions

### Developer Integration
- **React SDK** - Hooks and components for React applications
- **Angular SDK** - Services and components for Angular apps
- **Vanilla JavaScript** - Simple script tag integration
- **React Native SDK** - Mobile app integration
- **Webhook System** - Secure, reliable data delivery with retry logic

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT, OTP verification
- **Testing**: Vitest (unit), Playwright (E2E)
- **UI Components**: shadcn/ui with Radix UI primitives

## 📁 Project Structure

```
├── pages/                  # Next.js pages and API routes
│   ├── api/               # Backend API endpoints
│   ├── customer/          # Customer-facing pages
│   ├── admin/             # Admin portal pages
│   └── sdk-demo.tsx       # SDK demonstration
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui base components
│   │   ├── customer/     # Customer-specific components
│   │   ├── admin/        # Admin-specific components
│   │   └── sdk/          # SDK components
│   ├── lib/              # Utility libraries
│   └── styles/           # Global styles
├── prisma/               # Database schema and migrations
└── tests/                # Test suites
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kyc-onboarding-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your database URL and other configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/kyc_onboarding"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### End-to-End Tests
```bash
npm run test:e2e
```

## 📊 Database Schema

The platform uses a multi-tenant database schema with the following key entities:

- **Bank** - Represents financial institutions using the platform
- **BankAdmin** - Admin users who can configure KYC requirements
- **Customer** - End users completing KYC onboarding
- **KycConfig** - Configurable KYC requirements per bank
- **KycSubmission** - Customer KYC data submissions
- **Document** - Uploaded identity documents
- **WebhookLog** - Webhook delivery tracking

## 🔗 SDK Integration Examples

### React Integration
```jsx
import { useKYC } from '@kyc-platform/react-sdk'

function App() {
  const { KYCWidget, isComplete } = useKYC({
    apiKey: 'your-api-key',
    bankId: 'your-bank-id',
    onComplete: (data) => console.log('KYC completed:', data)
  })

  return <KYCWidget />
}
```

### Vanilla JavaScript
```html
<div id="kyc-widget"></div>
<script src="https://cdn.kyc-platform.com/widget.js"></script>
<script>
  KYCWidget.init({
    container: '#kyc-widget',
    apiKey: 'your-api-key',
    bankId: 'your-bank-id'
  })
</script>
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **OTP Verification** - Multi-factor authentication via email/SMS
- **HMAC Webhook Signatures** - Secure webhook payload verification
- **Input Validation** - Comprehensive data validation and sanitization
- **HTTPS Enforcement** - Secure data transmission

## 📚 API Documentation

### Customer Endpoints
- `POST /api/customer/register` - Register new customer
- `POST /api/customer/verify-otp` - Verify OTP codes
- `POST /api/customer/submit-kyc` - Submit KYC data

### Admin Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/submissions` - List KYC submissions
- `POST /api/admin/config` - Update KYC configuration

### Webhook Endpoints
- `POST /api/webhook/kyc-complete` - KYC completion webhook

## 🚀 Deployment

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### Build Commands
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Email: support@kyc-platform.com
- Documentation: https://docs.kyc-platform.com