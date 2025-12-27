import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ielts-listening/$cambridgeNum')({
  component: () => <Outlet />,
})
