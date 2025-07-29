import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';

const EmailVerification = (props: { userName: string; verificationUrl: string }) => {
  const { userName, verificationUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[32px] font-bold text-gray-900 mb-3">
                DocZap
              </Text>
              <Text className="text-[16px] text-gray-600 mt-[8px]">
                Your documentation platform!
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 mb-[16px]">
                Verify Your Email Address
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Hi there!
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Welcome to DocZap! To complete your account setup and start managing your documents securely, please verify your email address by clicking the button below.
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px]">
                We received a registration request for: <strong>{userName}</strong>
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={verificationUrl}
                  className="bg-gray-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-medium no-underline box-border hover:bg-blue-700"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button above doesn't work, you can copy and paste this link into your browser:
              </Text>
              
              <Text className="text-[14px] text-blue-600 break-all mb-[24px] m-0">
                {verificationUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                This verification link will expire in 24 hours for security purposes.
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[0] m-0">
                If you didn't create an account with DocZap, you can safely ignore this email.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@doczap.com" className="text-blue-600 no-underline">
                  support@doczap.com
                </a>
              </Text>
              
              <Text className="text-[12px] text-gray-500 mb-[8px] m-0">
                DocZap Inc., C20, Ikkas Apartments, Chittethukara, CSEZ, Kakkanad, Kochi, Kerala, India.
              </Text>
              
              <Text className="text-[12px] text-gray-500 m-0">
                © 2025 DocZap. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default EmailVerification;