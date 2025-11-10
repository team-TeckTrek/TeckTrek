import { DemoData } from '@/feature/demo/types'

export const data = {
  demo: [
    {
      id: '001',
      label: 'sample1',
    },
    {
      id: '002',
      label: 'sample2',
    },
    {
      id: '003',
      label: 'sample3',
    },
  ],
} as const satisfies DemoData
