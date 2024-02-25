import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import {VectorLineComponent} from './vector-line.component'
import { VectorInteractiveComponent } from '../vector-interactive/vector-interactive.component';


const meta: Meta<any> = {
    title:"VectorLine",
    component:VectorInteractiveComponent,
    tags:['autodocs'],
    argTypes:{
        click:{action:"click"},
        mouseover:{action:"mouseover"},
        mouseout:{action:"mouseout"}
    },
    decorators:[
        moduleMetadata({
            imports:[VectorLineComponent]
        })
    ],
    render:(args:any) => {
        
        return {
            props:{
                ...args,
                click:action("click")
            },
            template:`<nx-vector-interactive>
                <nx-vector-line ${argsToTemplate(args)}></nx-vector-line>
            </nx-vector-interactive>`
        }
    }
}

export default meta;
type Story = StoryObj<any>;
export const Default: Story = {
    args: {
        coords:{x1:20,x2:500,y1:20,y2:20},
        stroke:"red",
        strokeWidth:2
    },
  };