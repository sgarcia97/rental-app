import type { Metadata } from 'next'
import TemplateManager from '@/components/template-manager'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'capstone',
  description: 'secure-home',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TemplateManager>{children}</TemplateManager>
  )
}