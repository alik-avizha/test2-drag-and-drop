import type { Meta, StoryObj } from '@storybook/react'

import { ReduxStoreProviderDecorator } from '../../common/decorators/reduxStoreProviderDecorator.tsx'

import App from './app.tsx'

const meta = {
  title: 'App/DragAndDrop',
  component: App,

  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
} satisfies Meta<typeof App>

export default meta
type Story = StoryObj<typeof meta>

export const AppStory: Story = {}
