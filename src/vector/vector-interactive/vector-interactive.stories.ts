import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import {VectorInteractiveComponent} from './vector-interactive.component'

const meta: Meta<VectorInteractiveComponent> = {
    title:"VectorInteractive",
    component:VectorInteractiveComponent,
    tags:['autodocs'],
    render:(args:VectorInteractiveComponent) => {
    
        return {
            props:{
                ...args
            },
            template:`<nx-vector-interactive ${argsToTemplate(args)}></nx-vector-interactive>`
        }
    }
}

export default meta;
type Story = StoryObj<VectorInteractiveComponent>;
export const Default: Story = {
    args: {
        width:600,
        height:400
    },
  };