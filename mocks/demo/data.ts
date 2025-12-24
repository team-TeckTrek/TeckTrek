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
    {
      id: '004',
      label: 'asdfasdfa',
    },
  ],
} as const satisfies DemoData
