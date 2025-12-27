import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ielts-reading/$cambridgeNum')({
  component: () => <Outlet />,
})
